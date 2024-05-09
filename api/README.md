
# Python imports
`pip install flask `
`pip install requests`
`pip install flask-cors`
`pip install web3`

# Running the application (server only)
`cd api` -> `flask --app main run`
Hosted on http://127.0.0.1:5000/


# Endpoints 

`getTransactions` - GET method to fetch transactions for a user 
params: **user_address**


Example response: 
```json
{
    "data": {
        "averageGasUsed": "(173015.7142857143,)",
        "transactionCount": 49,
        "transactions": [{
                "from": "0x2b31dde7a5224ccc509d83387c2072218e30dd18",
                "functionName": "approve(address spender,uint256 amount)",
                "gas": "46767",
                "gasPrice": "122955218",
                "gasUsed": "46384",
                "to": "0x4045b33f339a3027af80013fb5451fdbb01a4492",
                "value": "0"
            },
            {
                "from": "0x2b31dde7a5224ccc509d83387c2072218e30dd18",
                "functionName": "buy(address target)",
                "gas": "176327",
                "gasPrice": "120711430",
                "gasUsed": "151784",
                "to": "0x4f3039102a14f3bc9a18aceb74300f254038ae2c",
                "value": "8999999999999999"
            },
            {
                "from": "0x2b31dde7a5224ccc509d83387c2072218e30dd18",
                "functionName": "sell(address target, uint256 shares)",
                "gas": "248634",
                "gasPrice": "97903321",
                "gasUsed": "197949",
                "to": "0x4f3039102a14f3bc9a18aceb74300f254038ae2c",
                "value": "0"
            }],
        }
    }
```