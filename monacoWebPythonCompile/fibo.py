'''
def fibo1( n ) :
    if n == 1 or n == 2:
        return 1
    return fibo1(n-2) + fibo1(n-1)
'''

'''
def fibo3( n ) :
    a,b = 1,1
    for _ in range( 1, n ):
        a,b = b, a+b
    return a
'''


#체크
def fibo3( n , nList = [] ) :
    nList.append(n)
    print(nList)
    if n == 1 or n == 2:
        return 1
    return fibo3( n - 2 ) + fibo3( n - 1 )


#중복 횟수 계산

def fibo2( n , nList = [] , tList = [] ) :
    if n in nList :
        tList.append(n)
        print('tList = ',tList)
    else :
        nList.append(n)
        print('nList = ',nList)
    if n == 1 or n == 2:
        return 1
    return fibo2( n - 2 ) + fibo2( n - 1 )


#7 = 13
#6 = 8
#5 = 5
def main() :
    #print(fibo2( 5 ))
    print(fibo2(5))

if (__name__) == "__main__" :
    main()