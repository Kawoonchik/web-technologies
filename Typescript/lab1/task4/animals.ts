interface Animal {
    name: string;

    age?: number | undefined;
    sound?: string | undefined;
    
    move(): void;
}

class Cat implements Animal {
    name: string;
    age?: number | undefined;
    sound?: string | undefined;

    constructor(name: string, age?: number, sound?: string) {
        this.name = name;
        this.age = age;
        this.sound = sound;
    }

    move(): void {
        console.log(`${this.name} moves on all fours.`);
    }
}

class Bird implements Animal {
    name: string;
    age?: number | undefined;

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age;
    }

    move(): void {
        console.log(`${this.name} flies in the sky.`);
    }
}

class Fish implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    move(): void {
        console.log(`${this.name} swims in the water.`);
    }
}


console.log("Zoopark:");
const cat = new Cat("Musya", 3, "nya");
const bird = new Bird("Parrot", 2);
const fish = new Fish("Okun' ");

cat.move();

if (cat.sound) { 
    console.log(`${cat.name} makes sound: ${cat.sound}`);
}
bird.move();
fish.move();