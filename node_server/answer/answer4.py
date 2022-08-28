# 0 99
# https://www.acmicpc.net/problem/1110

file_name = __file__.split('.')[0]
with open(f'input_{file_name}.txt', 'w') as in_file, open(f'output_{file_name}.txt', 'w') as out_file:
    # N = int(input())
    for N in range(100):
        n = N
        cycle = 0
        res = -1
        while res != N:
            temp = int(n / 10) + n % 10
            res = n % 10 * 10 + temp % 10
            n = res
            cycle +=1 

        in_file.write(f'{n}\n')
        out_file.write(f'{cycle}\n')
        # print(cycle)