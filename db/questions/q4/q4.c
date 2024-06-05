
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int a = 5;
    int b = 6;
    a = b - a;
    if ((a > 0) && (a > b)) {
        b = a - b;
    } else {
        a = b - a;
    }
    printf("a: %d b: %d\n", a, b);
    return 0;
}