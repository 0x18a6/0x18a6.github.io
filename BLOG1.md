# A bit of Knowledge on Zero Knowledge Proofs

Are you zero knowledge on zero-knowledge proofs? Read along then anon!

So you've been playing with smart contracts logic for a while, and your privacy maxi friend is filling your twitter feed with moon math papers and [zero-knowledge puns](https://x.com/Zac_Aztec/status/1754603805180600551) (is your friend Zac Williamson?)
You decide to learn what ZK is about. There are really two questions here: *what* is a zero-knowledge proof and *how* does it work? Let's attempt to answer both [by solving a ZK puzzle](https://github.com/RareSkills/noir-puzzles/tree/main/circuits/Sudoku).

The goal of the puzzle is to create a 4×4 Sudoku verifier in Noir, which is a DSL for zero-knowledge proofs.

Wait... verifier who?

In zero-knowledge proofs, a "prover" demonstrates to a "verifier" the truth of a statement without revealing any information beyond the statement’s veracity.
In the context of our puzzle, the prover demonstrates to the verifier that he knows a Sudoku solution without revealing the solution itself (or any other information for that matter).

## Puzzle Breakdown

Noir has Rust based syntax, [the legend says](https://x.com/zachobront/status/1658465443571552259): "If you learn Rust, you get Noir for free". Take a look at the snippet of code below:

```rust
fn main(question: pub [Field; 16], answer : [Field; 16]) {

    for i in 0..16 {
        let mut a = question[i] == answer[i];
        let mut b = question[i] == 0;
        let c = a | b;
        assert(c == true);
    }

	// rest of the code
}
```

This Noir code checks if each element in `question` array is either equal to zero or to the corresponding element in `answer` array. We are going to check if `solution` corresponds to a given `question` setup.
In ZK, we form a set of constraints that if satisfied, prove a computation was carried out correctly. `assert()` is a special function in Noir that "constrains" the expression inside it to be `true`. If the expression is false at runtime, the program will fail to be proven. For more context on constraints, check out ["How arithmetic circuits are used to verify zero knowledge proofs"](https://www.rareskills.io/post/zk-circuits#:~:text=Zk%20circuits%20form%20a%20set,multiplication%20over%20a%20finite%20field.).

A man is as good is his word, let's look at the next constraint:

```rust
fn main(question: pub [Field; 16], answer: [Field; 16]) {

// first constraint code

let mut m:[Field; 16] = [0; 16];
for i in 0..4 {
	let mut a = question[i];
	assert(a == question[i]);
	let mut b = 0;
	assert(b == 0);
	let c = a == b;
	m[i] = c as Field;
}
assert(3 == (m[0] + m[1] + m[2] + m[3]));

// rest of the code
```

It constrains a row to contain three zero elements and one non-zero element. With the first constraint in mind, they together assure `solution` array corresponds to `question` array.

Got a taste of how constraints work? Let's write some anon. We're asked to write Noir code such that:

- Sum of each row/column should be 10.
- There should be no repetition in numbers for any row/column.

Go give it a damn try lol.

Here's my implementation, notice that the other constraints of the puzzle are implicitly asserted:

```rust
// Solution Starts Here ..
// Sum of each row should be 10
assert(10 == answer[0] + answer[1] + answer[2] + answer[3]);
assert(10 == answer[4] + answer[5] + answer[6] + answer[7]);
assert(10 == answer[8] + answer[9] + answer[10] + answer[11]);
assert(10 == answer[12] + answer[13] + answer[14] + answer[15]);
// There should be no repetition in numbers for any row
for row in 0..4 {
	let mut arr: [Field; 4] = [0; 4];
	for i in 0..4 {
		arr[answer[row * 4 + i] - 1] += 1;
	}

	for i in 0..4 {
		assert(arr[i] == 1);
	}
}

// columns
// Sum of each column should be 10
assert(10 == answer[0] + answer[4] + answer[8] + answer[12]);
assert(10 == answer[1] + answer[5] + answer[9] + answer[13]);
assert(10 == answer[2] + answer[6] + answer[10] + answer[14]);
assert(10 == answer[3] + answer[7] + answer[11] + answer[15]);
// There should be no repetition in numbers for any column
for col in 0..4 {
	let mut arr: [Field; 4] = [0; 4];
	for i in 0..4 {
		arr[answer[i * 4 + col] - 1] += 1;
	}

	for i in 0..4 {
		assert(arr[i] == 1);
	}
}
```

[Btw](https://noir-lang.org/docs/getting_started/installation/), with `nargo` you can start new projects, compile, execute, prove, verify, test, generate Solidity contracts, and do pretty much all that is available in Noir.

Do with this what you will.

## End-To-End App

I upgraded the puzzle solution to an end-to-end app , [thanks to NoirJS package](https://noir-lang.org/docs/tutorials/noirjs_app/) meant for building ZK web apps.
