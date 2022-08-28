# 1 9
# https://www.acmicpc.net/problem/1008

# file_name = __file__.split('.')[0]
# with open(f'input_{file_name}.txt', 'w') as in_file, open(f'output_{file_name}.txt', 'w') as out_file:
#     for a in range(1, 10):
#         for b in range(1, 10):
#             in_file.write(f'{a} {b}\n')
#             out_file.write(f'{a/b}\n')
a, b = map(int, input().split())
print(a/b)