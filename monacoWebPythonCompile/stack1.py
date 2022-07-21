#헨젤과 그레텔 p 228
class Stack :
    def __init__( self , stack = [] , top = 0 ) :
        self.stack = stack
        self.top = top
    
    def isFull( self ) :
        if self.top >= len(self.stack) :
            return True
        else :
            return False
    
    def isEmpty( self ) :
        if self.top <= 0 :
            return True
        else :
            return False
    
    def append( self , data ) :    
        if (not self.isFull()) :
            self.stack[self.top] = data
            self.top += 1
    def pop( self ):
        if (not self.isEmpty()) :
            self.top -= 1
            return self.stack[self.top]
        
    def peek( self ) :
        if ( not self.isEmpty() ):
            return self.stack[self.top]
        
class Node :
    def __init__( self , data = "") :
        self.data = data



def main() :
    stack = Stack(stack = [None] * 8)
    
    
    n0 = Node("우리집")
    n1 = Node("주황")
    n2 = Node("초록")
    n3 = Node("파랑")
    n4 = Node("보라")
    n5 = Node("빨강")
    n6 = Node("노랑")
    n7 = Node("과자집")
    
    stack.append(n0)
    stack.append(n1)
    stack.append(n2)
    stack.append(n3)
    stack.append(n4)
    stack.append(n5)
    stack.append(n6)
    stack.append(n7)
    
    
    for i in range( 8 ) :
        print(stack.stack[i].data)
    print(" ")
    for i in range( 8 ) :
        print(stack.pop().data)
    

if (__name__) == "__main__":
    main()