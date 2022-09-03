# 0 12
# https://www.acmicpc.net/problem/10872


def factorial(N):
    if N==0:
        return 1
    else:
        return N * factorial(N-1)


file_name = __file__.split('.')[0]
with open(f'input_{file_name}.txt', 'w') as in_file, open(f'output_{file_name}.txt', 'w') as out_file:
    for N in range(13):
        #N = int(input());
        #print(factorial(N))
        in_file.write(f'{N}\n')
        out_file.write(f'{factorial(N)}\n')