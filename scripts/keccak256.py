from web3 import Web3

needed = ['beced095', '42a7b7dd', '45e010b9', 'a86c339e']

for i in range(0, 15792089237316195423570985008687907853269984665640564039457584007913129639936):
    print(i)
    h = Web3.toHex(Web3.soliditySha3(['uint256'], [i]))
    if h[2:10] in needed:
        file = open("./cache/result.txt", "a")
        file.write(h[2:10] + ' ' + str(i) + '\n')
        file.close()
