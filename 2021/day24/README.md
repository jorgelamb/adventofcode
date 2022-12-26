# 2021 day 24

The program run out of memory if using cache at all levels. Run with different leading numbers until it failed, then update and rerun for remaining cases:

```for i in $( seq 9 1 ); do node day24_part1_v2.js $i | tee -a output.txt; done```
