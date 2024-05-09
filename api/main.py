from flask import Flask, request, jsonify
# Setup
from web3 import Web3
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Initialize the Flask application
app = Flask(__name__)
CORS(app)
# Load environment variables from .env file
load_dotenv()

alchemy_url = "https://base-mainnet.g.alchemy.com/v2/rje5YPS0qS-jeo92fZ4QUJshpVXzlNua"
w3 = Web3(Web3.HTTPProvider(alchemy_url))
if not w3.is_connected():
    app.logger.error("Failed to connect to API")
else: 
    app.logger.info(w3.is_connected())


# Tracks all transactions made by a specific user address. This endpoint can provide insights into user activity patterns, transaction types, and frequencies.
@app.route('/getTransactions/<user_address>', methods=["GET"])
def get_transactions(user_address):
    if not w3.is_address(user_address): 
        return jsonify({"error": "Address Not Found"}), 404 
    
    
    # Example usage"
    start_block = 0
    sort = "asc"
    
    end_block = w3.eth.block_number
    start_block = max(0, end_block - 1000000)
    # Get a list of normal transactions by Address (BaseScan API)
    url = "https://api.basescan.org/api"
    params = {
        "module": "account",
        "action": "txlist",
        "address": user_address,
        "startblock": start_block,
        "endblock": end_block,
        "sort": sort,
        "apikey": os.getenv('API_KEY')
    }

    resp = requests.get(url, params=params)
    
    if resp.status_code == 200:
        transactions = resp.json()
        #print("Response: ", str(transactions))
        data = transactions['result']
        average_gas = sum(int(tx['gasUsed']) for tx in data) / len(data) if data else 0,
        
        response = {
            'transactionCount': len(transactions['result']),
            'averageGasUsed': str(average_gas),
            'uniqueAddressesInteractedWith': '',
            'transactions': [],
            
        }
    
        for tx in transactions['result']: 
            transact = {
            'from': tx['from'],
            'to': tx['to'],
            'value': tx['value'],
            'gas': tx['gas'],
            'gasPrice': tx['gasPrice'],
            'gasUsed': tx['gasUsed'],
            'functionName': 'Buy' if tx['functionName'] == "" else tx['functionName'],
            }
            response['transactions'].append(transact)
            uniqueAddressesInteractedWith = set()
            uniqueAddressesInteractedWith.add(tx['from'])
            uniqueAddressesInteractedWith.add(tx['to'])
            
            response['uniqueAddressesInteractedWith'] = len(uniqueAddressesInteractedWith)
        
        return jsonify({'status': 'success', 'data': response }), 200
    else:
        return "Failed to retrieve transactions: HTTP {}".format(response.status_code)


@app.route('/getContractInfo/<contract_address>', methods=["GET"])
def get_contract(contract_address):
    url = "https://api.basescan.org/api"
    params = {
        "module": "contract",
        "action": "getsourcecode",
        "address": contract_address,
        "apikey": os.getenv('API_KEY')
    }

    resp = requests.get(url, params=params)
    
    if resp.status_code == 200:
        contract_info = resp.json()
        #print("Response: ", str(transactions))
        data = contract_info['result']
        if not data:
            return jsonify({"error": "Verified Contract Not Found"}), 404
        
        response = {
            'contractName': 'PEPE' if data[0]['ContractName'] == "" else data[0]['ContractName'],
        }
        
        return jsonify({'status': 'success', 'data': response }), 200
    else:
        return "Failed to retrieve transactions: HTTP {}".format(response.status_code)
# Provides a detailed view of all interactions through a user's wallet, including transfers in and out, contract interactions, and token exchanges.
@app.route('/get_wallet', methods=["GET"])
def get_wallet():
    return None 

# Tracks ERC-20 or other token types holdings and transfers for a user. This could help users track their investments or usage of various tokens.
@app.route('/getUserTokens/<user_address>', methods=["GET"])
def get_user_tokens(user_address):
    
    if not user_address or not w3.is_address(user_address):
        return jsonify({'error': 'Invalid or missing address'}), 404
    
    params = {
        'owner':user_address,
    }
    
    alc_url = "https://base-mainnet.g.alchemy.com/nft/v3/rje5YPS0qS-jeo92fZ4QUJshpVXzlNua/getNFTsForOwner"
    
# 0x5b9550f5bc5e3b1d82297c7683a84003158465a9
# 0x88398dac284753fc651cd475b42aa507413f4fd2
# 0x88398dac284753fc651cd475b42aa507413f4fd2
# 0xbebe81ee5dc2625535d781f8fbb9c04c1128d1a2
# 0xf25b3fa015f33c9d8d760069091150709516004a

# Wormhole Token" 

    response = requests.get(alc_url, params=params)
    if response.status_code == 200:
        big_response = response.json()

        response = {
        "nft_details": [
            {
                "description": nft.get("description", "No description available."),
                "imageUrl": nft["image"].get("originalUrl", "No image available."),
                "tokenType": nft["tokenType"],
            } for nft in big_response["ownedNfts"]
        ]
    }
        return jsonify({'status': 'success', 'data': response}), 200
            
    else:
        return jsonify({'error': 'Failed to retrieve token data'}), response.status_code
    
# This endpoint could provide a dashboard view for a user, aggregating data like total assets, recent transactions, pending actions, etc.
@app.route('/get_user_dashboard', methods=["GET"])
def get_user_dashboard():
    return None
    
    
if __name__ == '__main__':
    app.run(debug=True)