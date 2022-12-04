#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct node {
   int instruction;
   char variable;
   char variable2;
   int parameter;
};

#define ADD 1
#define DIV 2
#define EQL 3
#define INP 4
#define MOD 5
#define MUL 6
#define ADD_VAR 7
#define DIV_VAR 8
#define EQL_VAR 9
/* #define INP_VAR 10 */
#define MOD_VAR 11
#define MUL_VAR 12

int states[][4] = {
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 },
	{ 0, 0, 0, 0 }
};

int runRecursive(struct node* program, int startLine, int* state, int depth, int* number);

int main() {
	FILE * fp;
	struct node program[252];
	char str1[10], str2[10], str3[10];

	fp = fopen ("input.txt", "r");
	for(int i=0; i<252; i++) {
		fscanf(fp, "%s", str1);
		switch(str1[1]) {
			case 'd': // add
				fscanf(fp, "%s", str2);
				fscanf(fp, "%s", str3);
				program[i].variable = str2[0]-'w';
				if(str3[0]>='w' && str3[0]<='z') {
					program[i].variable2 = str3[0]-'w';
					program[i].instruction = ADD_VAR;
				} else {
					program[i].parameter = atoi(str3);
					program[i].instruction = ADD;
				}
				break;
			case 'i': // div
				fscanf(fp, "%s", str2);
				fscanf(fp, "%s", str3);
				program[i].variable = str2[0]-'w';
				if(str3[0]>='w' && str3[0]<='z') {
					program[i].variable2 = str3[0]-'w';
					program[i].instruction = DIV_VAR;
				} else {
					program[i].parameter = atoi(str3);
					program[i].instruction = DIV;
				}
				break;
			case 'q': // eql
				fscanf(fp, "%s", str2);
				fscanf(fp, "%s", str3);
				program[i].variable = str2[0]-'w';
				if(str3[0]>='w' && str3[0]<='z') {
					program[i].variable2 = str3[0]-'w';
					program[i].instruction = EQL_VAR;
				} else {
					program[i].parameter = atoi(str3);
					program[i].instruction = EQL;
				}
				break;
			case 'n': // inp
				fscanf(fp, "%s", str2);
				program[i].instruction = INP;
				program[i].variable = str2[0]-'w';
				break;
			case 'o': // mod
				fscanf(fp, "%s", str2);
				fscanf(fp, "%s", str3);
				program[i].variable = str2[0]-'w';
				if(str3[0]>='w' && str3[0]<='z') {
					program[i].variable2 = str3[0]-'w';
					program[i].instruction = MOD_VAR;
				} else {
					program[i].parameter = atoi(str3);
					program[i].instruction = MOD;
				}
				break;
			case 'u': // mul
				fscanf(fp, "%s", str2);
				fscanf(fp, "%s", str3);
				program[i].variable = str2[0]-'w';
				if(str3[0]>='w' && str3[0]<='z') {
					program[i].variable2 = str3[0]-'w';
					program[i].instruction = MUL_VAR;
				} else {
					program[i].parameter = atoi(str3);
					program[i].instruction = MUL;
				}
				break;
			default:
				exit(-1);
				break;
		}
	}

	int number[] = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
	runRecursive(program, 0, states[0], 0, number);
	return 0;
}

int runRecursive(struct node* program, int startLine, int* state, int depth, int* number) {
	if(depth == 6) {
		printf("%d%d%d%d%d%d\n", number[0], number[1], number[2], number[3], number[4], number[5]);
	}
	int* newState = states[depth];
	for(int l=startLine; l<252; l++) {
		//printf("%d %d\n", startLine, depth);
		struct node instruction = program[l];
		//printf("instruction: %d\n", instruction.instruction);
		//printf("state: w=%d x=%d y=%d z=%d\t\t%d\n", state[0], state[1], state[2], state[3], l);
		switch(instruction.instruction) {
			case ADD:
				//printf("ADD: %c %d\n", instruction.variable+'w', instruction.parameter);
				state[instruction.variable] += instruction.parameter;
				break;
			case DIV:
				//printf("DIV: %c %d\n", instruction.variable+'w', instruction.parameter);
				state[instruction.variable] /= instruction.parameter;
				break;
			case EQL:
				//printf("EQL: %c %d\n", instruction.variable+'w', instruction.parameter);
				if(state[instruction.variable] == instruction.parameter) {
					state[instruction.variable] = 1;
				} else {
					state[instruction.variable] = 0;
				}
				break;
			case INP:
				//printf("INP: %c\n", instruction.variable+'w');
				for(int newInput=9; newInput>=1; newInput--) {
					for(int i=0; i<4; i++) {
						newState[i] = state[i];
					}
					newState[instruction.variable] = newInput;
					number[depth] = newInput;
					runRecursive(program, l+1, newState, depth+1, number);
				}
				return 0;
			case MOD:
				//printf("MOD: %c %d\n", instruction.variable+'w', instruction.parameter);
				state[instruction.variable] %= instruction.parameter;
				break;
			case MUL:
				//printf("MUL: %c %d\n", instruction.variable+'w', instruction.parameter);
				state[instruction.variable] *= instruction.parameter;
				break;
			case ADD_VAR:
				//printf("ADD_VAR: %c %c\n", instruction.variable+'w', instruction.variable2+'w');
				state[instruction.variable] += state[instruction.variable2];
				break;
			case DIV_VAR:
				//printf("DIV_VAR: %c %c\n", instruction.variable+'w', instruction.variable2+'w');
				state[instruction.variable] /= state[instruction.variable2];
				break;
			case EQL_VAR:
				//printf("EQL_VAR: %c %c\n", instruction.variable+'w', instruction.variable2+'w');
				if(state[instruction.variable] == state[instruction.variable2]) {
					state[instruction.variable] = 1;
				} else {
					state[instruction.variable] = 0;
				}
				break;
			case MOD_VAR:
				//printf("MOD_VAR: %c %c\n", instruction.variable+'w', instruction.variable2+'w');
				state[instruction.variable] %= state[instruction.variable2];
				break;
			case MUL_VAR:
				//printf("MUL_VAR: %c %c\n", instruction.variable+'w', instruction.variable2+'w');
				state[instruction.variable] *= state[instruction.variable2];
				break;
			default:
				printf("Instruction not found: %d\n", instruction.instruction);
				exit(-2);

		}
	}
	if(state[3]==0) {
		printf("%d%d%d%d%d%d%d%d%d%d%d%d%d%d\t%d\n", number[0], number[1], number[2], number[3], number[4], number[5], number[6], number[7], number[8], number[9], number[10], number[11], number[12], number[13], state[3]);
		exit(0);
	} else {
		//printf("%d%d%d%d%d%d%d%d%d%d%d%d%d%d\t%d\n", number[0], number[1], number[2], number[3], number[4], number[5], number[6], number[7], number[8], number[9], number[10], number[11], number[12], number[13], state[3]);
	}
	return 0;
}
