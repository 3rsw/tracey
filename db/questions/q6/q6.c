
#include <stdio.h>
#include <stdlib.h>

int zero(int a_val, int *b_ptr) { 
    a_val = 0;
    *b_ptr = 0;
}

int main(void) {
    int a = 3;
    int b = 4;
    zero(a, &b);
    printf("a is %d and b is %d", a, b);
    return 0;
}