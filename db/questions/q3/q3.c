
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int values[3] = {3, 6, 9};
    int result = 0;
    int i = 2;
    int mul = 1;
    while (i >= 0) {
        result += values[i] * mul;
        mul *= 10;
        i--;  
    }
    printf("The result is %d", result);
    return 0;
}
