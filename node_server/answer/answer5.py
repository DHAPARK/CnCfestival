# 1 14
# https://www.acmicpc.net/problem/1834

SIZE = 15
apt = list(list(0 for _ in range(SIZE)) for _ in range(SIZE))

for i in range(SIZE):
    apt[i][0] = 1;
    apt[0][i] = i + 1

for i in range(1, SIZE):
    for j in range(1, SIZE):
        apt[i][j] = apt[i-1][j] + apt[i][j-1]


file_name = __file__.split('.')[0]
with open(f'input_{file_name}.txt', 'w') as in_file, open(f'output_{file_name}.txt', 'w') as out_file:
    for k in range(1, 15):
        for n in range(1, 15):
            in_file.write(f'{k} {n}\n')
            out_file.write(f'{apt[k][n-1]}\n')
