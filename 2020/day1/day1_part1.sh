cat input.txt| awk '{ if(a[2020-$1] == 1) { print $1 * (2020-$1) } else { a[$1] = 1; } }'
