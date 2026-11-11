interface Borrowable {
  lateFee(daysLate: number): number;
}

abstract class LibraryItem implements Borrowable {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  protected abstract feePerDay(): number;

  lateFee(daysLate: number): number {
    return daysLate * this.feePerDay();
  }

  describe(): string {
    return this.title;
  }
}

class Book extends LibraryItem {
  protected override feePerDay(): number {
    return 100;
  }
}

class Dvd extends LibraryItem {
  protected override feePerDay(): number {
    return 250;
  }
}

class Laptop implements Borrowable {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  lateFee(daysLate: number): number {
    return 5000 + daysLate * 1000;
  }
}

const novel = new Book("Things Fall Apart");
const film = new Dvd("Atlantics");
const laptop = new Laptop("LT-07");

// ---------- 3.1 totalFees ----------

function totalFees(items: readonly Borrowable[], daysLate: number): number {
  let total = 0;
  for (const item of items) {
    total += item.lateFee(daysLate);
  }
  return total;
}

console.log(totalFees([novel, film, laptop], 3));
console.log(totalFees([], 3));

// ---------- 3.2 mostCostly (generic) ----------

function mostCostly<T extends Borrowable>(
  items: readonly T[],
  daysLate: number
): T | undefined {
  let best: T | undefined = undefined;
  for (const item of items) {
    if (!best || item.lateFee(daysLate) > best.lateFee(daysLate)) {
      best = item;
    }
  }
  return best;
}

const worst = mostCostly([novel, film], 3);
if (worst) console.log(worst.describe());

const worstOverall = mostCostly([novel, laptop], 3);
if (worstOverall) console.log(worstOverall.lateFee(3));
