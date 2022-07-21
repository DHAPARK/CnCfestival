#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 19 00:22:09 2022

@author: dohyeonpark
"""

#과제시작
#1. 코드 개선
#2. 헛도는 숫자갯수 세기 10을 넣었을때 99가 나와야 정상


"""

edu@easyecg.xyz

[CODETEST11][이름][과제]

*.zip( *.py, *.txt )

"""

#3 = 2
#7 = 13

#아예 불필요한 사이클을 처음부터 세는 메서드 중간에 에러발생 사용불가
'''
def fib( n = 0 ):
    a,b = 1,1
    for i in range(n-1):
        a,b = ((2*a)+b),b
    return a
'''
'''
#헛도는 사이클 갯수까지 세는 메서드
def fib1( n = 0 ,numList = [] , startN = [],cnt=0) :
    if n in numList :
        cnt += 1
    else:
        startN.append(n+1)
        numList.append(n)
        print(numList)
        #여기서 차라리 마지막에 클로저를 돌리는건?
        if len(numList) == startN[0] :
            return cnt

    if n <= 1 :
        return n
    return fib1( n - 1 , numList ,startN ,cnt) + fib1( n - 2 , numList ,startN, cnt)
''' 

'''
def fib2(n = 0):
    if n == 1 or n == 2:
        return 1
    return fib2(n-1) + fib2(n-2)
'''
'''
def fib3(n):
    a,b=1,1
    for i in range(1,n):
        a,b = b,a+b
    return a
'''
def main() :
    '''
    print(fib1(5))
    print(fib2(5))
    print(fib3(5))
    '''
    
if ( __name__ == "__main__" ) :

    main()