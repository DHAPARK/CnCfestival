# p 272 콜센터의 응답 대기 시간 계산하기
class Queue :
    def __init__( self , queue = [] , rear = 0 , front = 0 ) :
        self.queue = queue
        self.rear = rear
        self.front = front
    def isFull( self ) :
        if ( self.rear != self.front ) and (self.rear % len(self.queue) == self.front) :
            print("queue가 full 상태입니다")
            return True
        
    def isEmpty( self ) :
        if self.rear == self.front :
            return True
    def enQueue( self , data ) :
        if not self.isFull() :
            self.queue[self.rear] = data
            self.rear += 1
    def deQueue( self ) :
        if not self.isEmpty() :
            data = self.queue[self.front]
            self.front += 1
            return data
    
    def getTotalTime( self ) :
        tot = 0
        for i in range( self.front , self.rear ) :
            tot += self.queue[i].time
        return tot
            
        
    
class Node :
    def __init__( self , data = None) :
        self.data = data
        if self.data == "고장수리" :
            self.time = 3
        elif self.data == "사용문의" :
            self.time = 9
        elif self.data == "환불문의" :
            self.time = 4
        elif self.data == "기타문의" :
            self.time = 1


def main() :
    queue = Queue( queue = [None] * 5 )
    
    n1 = Node("사용문의")
    n2 = Node("고장수리")
    n3 = Node("기타문의")
    n4 = Node("환불문의")
    n5 = Node("사용문의")
    queue.enQueue(n1)
    queue.enQueue(n2)
    queue.enQueue(n3)
    queue.enQueue(n4)
    queue.enQueue(n5)
    
    print(queue.getTotalTime())
    
    queue.deQueue()
    print(queue.getTotalTime())
    
if (__name__) == "__main__" :
    main()