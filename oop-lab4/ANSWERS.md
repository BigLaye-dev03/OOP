# Lab 4 — Answers

## Part 1

**Prediction 1:** No red underline (everything is `any`). At runtime, crashes on `awa.describe()` — Member has no describe method.

**Q1:** `any` switched off type checking. `memberList.add(42)` would NOT be caught. It gave up: safety, autocomplete, compile-time errors.

## Part 2

**Q2:** Error message: `Property 'getId' does not exist on type 'T'.` — because T could be anything, TS won't assume it has `getId()`. Fixed by `T extends HasId`.

**Q3:** Structural typing — a class matches an interface if it has the same shape, no `implements` needed.

**Q4:**
(a) Caught: passing a Member into a Book catalog. Made possible by: T is fixed to Book at `new Catalog<Book>()`.
(b) Caught: using `number` which has no getId(). Made possible by: the constraint `T extends HasId`.
(c) Caught: using a value that might be undefined. Made possible by: `find()` returns `T | undefined`.

**Prediction 2:** No test line changes. Output identical to Checkpoint 1.

**Q5:** Public interface (add, find, count) didn't change — only internal storage did. That's encapsulation.

**Q6:** `books.all().push(new Book("B-001", "Fake"));` breaks the rule. `Array.from(...)` returns a new array, so the caller can't touch the internal one.
**Prediction 2:** No test line changes. Output identical to Checkpoint 1. Confirmed.

**Q5:** The public interface (add, find, count) didn't change — only the internal storage did. That's encapsulation.

**Q6:** If `all()` returned `this.items` directly:
`books.all().push(new Book("B-001", "Fake"));`
— a caller could add a duplicate without going through `add()`. `Array.from(...)` returns a NEW array, so the caller can't touch the internal one.
## Part 3

**Q7:** The plain version returned `Borrowable`, which only has `lateFee()`. `describe()` is not on `Borrowable`, so TS refuses.

**Prediction 3:** `worstOverall` is `Book | Laptop`. `worstOverall.describe()` fails because `Laptop` has no `describe()`. `.lateFee(3)` works because both have it. Confirmed — printed `8000`.

**Q8:** A generic is worth it when the function **returns one of its inputs** (or a value whose type depends on the input). `totalFees` returns `number` — same type always, no `T` needed. `mostCostly` returns one of the input items — type depends on input, so `T` is needed. `worstOverall` type is `Book | Laptop` because TS inferred `T` from the mixed array.
## Part 4

**Q9:** `T` is chosen inside `Book`, at `private reservations = new Queue<string>()`. So `T = string` (member names). If it were `class Book extends Queue<string>`, then a caller could write:
`book.enqueue("Random Stranger");`
— pushing a name into the queue without calling `borrow()`, bypassing the "already borrowed / already waiting" checks.

**Q10:** First `borrow("Moussa")` → book was already with Awa, so Moussa was added to the queue (`false`).
Second `borrow("Moussa")` → Moussa was already in the queue, so nothing happened (`false`).
The caller cannot tell the difference between "you just joined the queue" and "you were already waiting" — both return `false`.

**Q11:** **Composition** — a `Book` *has-a* `Queue<string>` (it is not a Queue). Multiplicity: `Book "1" *-- "*" Queue~T~`. Composition is the right choice because the queue belongs entirely to the book — if the book is destroyed, the queue goes with it, and the queue has no meaning on its own.
## Part 5

**Prediction 4:** Red underline under `T` in `instanceof T`: "'T' only refers to a type, but is being used as a value here." Running it anyway throws a TypeError ("Right-hand side of 'instanceof' is not callable") — it stops, doesn't print true or false.

**Prediction 5:** Prints:
Things Fall Apart
NaN

**Q12:** Types are **erased** at runtime — `node` runs plain JavaScript. `BookData` was never checked against the actual JSON. The JSON has no `copies`, so `books[0].copies` is `undefined`, and `undefined + 1` is `NaN`. Data from outside the program must be validated at **runtime** (manually, or with a library like Zod).

**Q13:** If `best()` returned `HasId` instead of `T`, the caller could only call `.getId()` on the result — they'd lose access to `.describe()` (Book) or `.getName()` (Member). Returning `T` preserves the full original type of the stored item.

