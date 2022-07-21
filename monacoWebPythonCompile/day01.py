#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jun 18 23:58:06 2022

@author: dohyeonpark
"""

#3 = 2

#7 = 13


def fiboa( n ) :

    fn = [ 0, 1 ]

    for i in range( 2, n + 1 ) :

        fn.append( fn[i-1] + fn[i-2] )

    return fn[n]

#선생님이 해주신 코드
def fibob( n ) :

    fn = [ 0 ] * ( n + 1 ) ; fn[1] = 1

    for i in range( 2, n + 1 ) :

        fn[n] = fn[i-1] + fn[i-2] 

    return fn[n]

#수정코드
def fibob_Edit( n ) :
    #fn은 0이 n칸 들어있는 배열
    fn = [ 0 ] * ( n + 1 )
    #fn의 1번 index에 1 삽입 #여기서 의문 . 0번 index는 ? 그냥 0으로 대기?
    fn[1] = 1
    for i in range( 2, n + 1 ) :
        fn[i] = fn[i-1] + fn[i-2]
                # 2 f1 + f0 = 1  즉 첫시도에 fn[2] = 1이된다
                # 3 f2 + f1 == 1 + 1 fn[3] = 2가된다
                # 근데 왜 다른값이 나오지?
    return fn[n]


def main() :
    print("fiboa : ",fiboa( 7 ))
    print("fibob : ",fibob( 7 ))
    print("fibob_Edit :",fibob_Edit(7))
    #원인 : 42번째줄 fn[i]가 n으로 오타가 있으셨다.
    #해결.
    
    

if ( __name__ == "__main__" ) :

    main()