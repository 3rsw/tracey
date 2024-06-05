
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char name[5] = {'G', 'r', 'e', 'g', '\0'};
    int i = 0;
    while (name[i] != '\0') {
        if ((name[i] > 'a') && (name[i] < 'z')) {
            name[i] = name[i] - 'a' + 'A';
        }
        i++;
    }
    printf("The name is %s", name);
    return 0;
}