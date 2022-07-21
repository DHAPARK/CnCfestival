# p 230
#파일 내용을 완전히 거꾸로 출력하기

class Stack :
    def __init__( self , stack = [] , top = 0 ) :
        self.stack = stack
        self.top = top
    def isFull(self) :
        if ( self.top >= len(self.stack) ) :
            return True
        else :
            return False
    def isEmpty(self) :
        if ( self.top <= 0 ) :
            return True
        else :
            return False
        
    def append( self , data ) :
        if (not self.isFull() ) :
            self.stack[self.top] = data
            self.top += 1
    
    def peek( self ) :
        if ( not self.isEmpty() ) :
            return self.stack[self.top]
    
    def pop( self ) :
        if ( not self.isEmpty() ) :
            self.top -= 1
            return self.stack[self.top]
    
class Node :
    def __init__( self , data = None ) :
        self.data = data

def main() :
    n0 = Node("진달래꽃")
    n1 = Node("나 보기가 역겨워") 
    n2 = Node("가실 때에는")
    n3 = Node("말없이 고이 보내드리오리다.")
    
    stack = Stack( stack = [""] * 4 )
    stack.append(n0)
    stack.append(n1)
    stack.append(n2)
    stack.append(n3)
    
    for i in range( 4 ) :
        print(stack.stack[i].data)
    for i in range( 4 ) :
        print(stack.pop().data[-1 :  : -1])
    
    
if (__name__) == "__main__" :
    main()
