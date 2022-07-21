#p 269 유명 맛집의 대기줄 구현하기
class Queue :
    def __init__( self , queue = [] , rear = -1 , front = -1 ) :
        self.queue = queue
        self.rear = rear
        self.front = front
        
    def enqueue( self , data ) :
        if not self.isFull() :
            self.rear += 1
            self.queue[self.rear] = data
            
    def dequeue( self ) :
        if not self.isEmpty() :
            self.front += 1
            self.queue[self.front] = None
            #앞으로 한칸씩 당긴다
            self.queue[ self.front : self.rear ] = self.queue[ self.front+1 : self.rear +1 ]
            self.queue[ self.rear ] = None
            self.front -= 1
            self.rear -= 1
            
    def isEmpty( self ) :
        if self.front == self.rear :
            return True
        
    def isFull( self ) :
        if self.rear + 1 >= len(self.queue) :
            return True
    
class Node :
    def __init__( self , data = None ) :
        self.data = data

def main() :
    queue = Queue( queue = [None] * 5 )
    n1 = Node("정국")
    n2 = Node("뷔")
    n3 = Node("지민")
    n4 = Node("진")
    n5 = Node("슈가")

    queue.enqueue(n1)
    queue.enqueue(n2)    
    queue.enqueue(n3)
    queue.enqueue(n4)
    queue.enqueue(n5)    
    
    for i in range(5) :
        print( queue.queue[i].data, " " ,end=" ")
    
    
    print(" ")
    
    for _ in range(5) :
        queue.dequeue()
        for k in range(5) :
            if queue.queue[k] == None :
                print(None, end=" ")
                continue
            print( queue.queue[k].data, " " ,end=" ")
        print("")

if (__name__) == "__main__" :
    main()