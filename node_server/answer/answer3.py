# 1 1000
# https://www.acmicpc.net/problem/1357

def Rev(X):
    X = str(X)
    res = ""
    for i in range(len(X) - 1, -1, -1):
        res += X[i]
    return int(res)

file_name = __file__.split('.')[0]
with open(f'input_{file_name}.txt', 'w') as in_file, open(f'output_{file_name}.txt', 'w') as out_file:
    for X in range(1, 1000 + 1):
        for Y in range(1, 1000 + 1):
            in_file.write(f'{X} {Y}\n')
            out_file.write(f'{Rev(Rev(X) + Rev(Y))}\n')


# X, Y = map(int, input().split())
# print(Rev(Rev(X) + Rev(Y)))