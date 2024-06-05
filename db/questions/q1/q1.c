
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int a = 5;
    int b = 6;
    a = b - a;
    b = a - b;
    printf("a: %d b: %d\n", a, b);
    return 0;
}



