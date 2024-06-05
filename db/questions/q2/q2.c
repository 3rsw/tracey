
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int a = 5;
    int b = 6;
    a = b - a;
    if (a > 0 && a > b) {
        b = 2 * a;
    } else {
        a = 2 * b;
    }
    printf("a: %d b: %d\n", a, b);
    return 0;
}