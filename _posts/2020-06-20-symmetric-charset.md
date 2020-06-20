---
layout: post
title: A fully symmetric alpha-numeric font.
tags: [me]
---



<script src="{{site.url}}/assets/js/segment-display.js" type="text/javascript">
</script>
<script src="{{site.url}}/assets/js/bss.js" type="text/javascript">
</script>

<script type="text/javascript">

var display = new SegmentDisplay("display");
display.pattern         = "#:#:#:#:#:#:#:#:#:#";
display.displayAngle    = 0;
display.digitHeight     = 30;
display.digitWidth      = 14;
display.digitDistance   = 2.5;
display.segmentWidth    = 2;
display.segmentDistance = 0.3;
display.segmentCount    = 7;
display.cornerType      = 3;
display.colorOn         = "#e95d0f";
display.colorOff        = "#4b1e05";

display.draw();

var dish = new SegmentDisplay("dish");
dish.pattern         = "#:#:#:#:#:#:#:#:#:#";
dish.displayAngle    = 0;
dish.digitHeight     = 30;
dish.digitWidth      = 14;
dish.digitDistance   = 2.5;
dish.segmentWidth    = 2;
dish.segmentDistance = 0.3;
dish.segmentCount    = 16;
dish.cornerType      = 3;
dish.colorOn         = "#e95d0f";
dish.colorOff        = "#4b1e05";

dish.draw();

</script>


## Need for it

My exact thoughts were:

It would be cool to have a font which is fully symmetric. Every symbol having Left-Right symmetry and Up-Down symmetry.
You would still have to read left to right like you would do, but if you take care of that, the symbols look the same in the Mirror world or inverted mirror world.

## Segment display

I will be only using 7-Segment and 16-Segment digits to show here.

I am only using segment display to make my life easy and since the symmetries we are interested are line symmetries. LR symmetry is by horizontal line and UD symmetry is by vertical line. Segment display's segments play well with these axes of symmetries.

### Seven Segment

As the name implies, each digit consists of 7 individual segments which are lighted accordingly to convey the digit.

The [0-9] digits look like this:

<canvas id="display" width="260" height="100">
	Your browser is not supported
</canvas>
<script>
display.setValue("0:1:2:3:4:5:6:7:8:9")
</script>

Each individual element separately controlled. So, we can start naming each of them starting from the topmost and going in an clockwise fashion as A, B, C, D, E, F, G.

For simplicity sake, we can express the same as "ABCDEFG". 

The following shows the mapping between our naming and the segment in the 7-segment display.

<script type="text/javascript">

var play = new BitSegment("play");
play.ndigits         = 7;
play.displayAngle    = 0;
play.digitHeight     = 30;
play.digitWidth      = 14;
play.digitDistance   = 2.5;
play.segmentWidth    = 2;
play.segmentDistance = 0.3;
play.segmentCount    = 7;
play.cornerType      = 3;
play.colorOn         = "#e95d0f";
play.colorOff        = "#4b1e05";

play.draw();

</script>
<canvas id="play" width="260" height="100">
	Your browser is not supported
</canvas>
<script>
play.setValue([
	"1000000",
	"0100000",
	"0010000",
	"0001000",
	"0000100",
	"0000010",
	"0000001",
])
</script>

There are in total $$2^7$$ posibilities. 

#### LR Symmetry

Comparing the original digit with a Left-Right inverted one, we can identify segments which should match to give a symmetric digit.

Starting off with original as     "ABCDEFG",

LR symmetry makes it              "AFEDCBG"

Equating both to preserve symmetry "A=+D+=G", where "+=" are used as placeholders for segments.

Thereby, enforcing constraints and bringing total number of free parameters to $$5$$ which leads to $$2^5$$ possibilities.

<script type="text/javascript">
	var p7lr1 = new BitSegment("p7lr1");
	p7lr1.ndigits         = 8;
	p7lr1.segmentCount    = 7;
	p7lr1.draw();
	var p7lr2 = new BitSegment("p7lr2");
	p7lr2.ndigits         = 8;
	p7lr2.segmentCount    = 7;
	p7lr2.draw();
	var p7lr3 = new BitSegment("p7lr3");
	p7lr3.ndigits         = 8;
	p7lr3.segmentCount    = 7;
	p7lr3.draw();
	var p7lr4 = new BitSegment("p7lr4");
	p7lr4.ndigits         = 8;
	p7lr4.segmentCount    = 7;
	p7lr4.draw();
</script>
<div id="p7lr">
	<canvas id="p7lr1" width="380" height="100">
		Your browser is not supported
	</canvas>
	<canvas id="p7lr2" width="380" height="100">
		Your browser is not supported
	</canvas>
	<canvas id="p7lr3" width="380" height="100">
		Your browser is not supported
	</canvas>
	<canvas id="p7lr4" width="380" height="100">
		Your browser is not supported
	</canvas>
</div>
<script>
	p7lr1.setValue([
		"0000000",
		"1000000",
		"0100010",
		"1100010",
		"0010100",
		"1010100",
		"0110110",
		"1110110",
	])
	p7lr2.setValue([
		"0001000",
		"1001000",
		"0101010",
		"1101010",
		"0011100",
		"1011100",
		"0111110",
		"1111110",
	])
	p7lr3.setValue([
		"0000001",
		"1000001",
		"0100011",
		"1100011",
		"0010101",
		"1010101",
		"0110111",
		"1110111",
	])
	p7lr4.setValue([
		"0001001",
		"1001001",
		"0101011",
		"1101011",
		"0011101",
		"1011101",
		"0111111",
		"1111111",
	])
</script>

#### UD Symmetry

Doing similar thing for UD symmetry case,

Starting off with original as     "ABCDEFG",

UD symmetry makes it              "DCBAFEG",

Equating both to preserve symmetry "+%%+==G", where "+=%" are used as placeholders for segments.

Thereby, enforcing constraints and bringing total number of free parameters to $$4$$ which leads to $$2^4$$ possibilities.

<script type="text/javascript">
	var p7ud1 = new BitSegment("p7ud1");
	p7ud1.ndigits         = 8;
	p7ud1.segmentCount    = 7;
	p7ud1.draw();
	var p7ud2 = new BitSegment("p7ud2");
	p7ud2.ndigits         = 8;
	p7ud2.segmentCount    = 7;
	p7ud2.draw();
</script>
<canvas id="p7ud1" width="380" height="100">
	Your browser is not supported
</canvas>
<canvas id="p7ud2" width="380" height="100">
	Your browser is not supported
</canvas>
<script>
	p7ud1.setValue([
		"0000000",
		"1001000",
		"0110000",
		"1111000",
		"0000110",
		"1001110",
		"0110110",
		"1111110",
	])
	p7ud2.setValue([
		"0000001",
		"1001001",
		"0110001",
		"1111001",
		"0000111",
		"1001111",
		"0110111",
		"1111111",
	])
</script>

#### Full Symmetry

Enforcing LR and UD symmetries at the same time, brings out,
"+==+==G", where "+,=" are used as placeholders for segments.

In the fully symmetric case, number of free parameters is $$3$$ which only yields $$2^3$$ possibilities, which isn't even enough to cover the alphabets.

You can do base 8 counting though.


<script type="text/javascript">
	var p7lu = new BitSegment("p7lu");
	p7lu.ndigits         = 8;
	p7lu.segmentCount    = 7;
	p7lu.draw();
</script>
<canvas id="p7lu" width="380" height="100">
	Your browser is not supported
</canvas>
<script>
	p7lu.setValue([
		"0000000",
		"1001000",
		"0110110",
		"1111110",
		"0000001",
		"1001001",
		"0110111",
		"1111111",
	])
</script>



### Sixteen Segment

This segment display has 16 segments. 

The [0-9] digits look like this:

<canvas id="dish" width="260" height="100">
	Your browser is not supported
</canvas>
<script>
dish.setValue("0:1:2:3:4:5:6:7:8:9")
</script>

#### Repeating for sixteen-segments

Here, our naming convention would "ABCDEFGHIJKLMNOP".

The following shows the mapping between our naming and the segment in the 16-segment display.

<script type="text/javascript">

var p16 = new BitSegment("p16");
p16.ndigits         = 16;
p16.segmentCount    = 16;
p16.draw();


</script>
<div id="dp16" width="500">
<canvas id="p16" width="660" height="100">
	Your browser is not supported
</canvas>
</div>
<script>
p16.setValue([
	"1000000000000000",
	"0100000000000000",
	"0010000000000000",
	"0001000000000000",
	"0000100000000000",
	"0000010000000000",
	"0000001000000000",
	"0000000100000000",
	"0000000010000000",
	"0000000001000000",
	"0000000000100000",
	"0000000000010000",
	"0000000000001000",
	"0000000000000100",
	"0000000000000010",
	"0000000000000001",
])
</script>

There are in total $$2^7$$ posibilities. 

For a $$16$$ segment digit, we have $$2^{16}=65536$$ possibilities.


#### LR Symmetry

LR symmetry brings the number of free parameters to $$9$$ emitting $$2^9 = 512$$ possibilities.

Due to the sheer size of the set, I won't be showing them here.

####  UD Symmetry

UD symmetry also brings the number of free parameters to $$9$$ emitting $$2^9 = 512$$ possibilities.

Due to the sheer size of the set, I won't be showing them here.

#### Full Symmetry

Applying LR and UD symmetry constriants brings the number of free parameters to $$5$$ giving only $$2^5 = 32$$ possibilities.

The generating signature is: "CCAACCAADDEEBBBB" where "ABCDE" are placeholders for [01].

<script type="text/javascript">
	var p16lu1 = new BitSegment("p16lu1");
	p16lu1.ndigits         = 8;
	p16lu1.segmentCount    = 16;
	p16lu1.draw();
	var p16lu2 = new BitSegment("p16lu2");
	p16lu2.ndigits         = 8;
	p16lu2.segmentCount    = 16;
	p16lu2.draw();
	var p16lu3 = new BitSegment("p16lu3");
	p16lu3.ndigits         = 8;
	p16lu3.segmentCount    = 16;
	p16lu3.draw();
	var p16lu4 = new BitSegment("p16lu4");
	p16lu4.ndigits         = 8;
	p16lu4.segmentCount    = 16;
	p16lu4.draw();
</script>
<div id="p16lu">
	<canvas id="p16lu1" width="380" height="100">
		Your browser is not supported
	</canvas>
	<canvas id="p16lu2" width="380" height="100">
		Your browser is not supported
	</canvas>
	<canvas id="p16lu3" width="380" height="100">
		Your browser is not supported
	</canvas>
	<canvas id="p16lu4" width="380" height="100">
		Your browser is not supported
	</canvas>
</div>
<script>
	p16lu1.setValue([
		"0000000000000000",
		"1100110000000000",
		"0011001100000000",
		"1111111100000000",
		"0000000011000000",
		"1100110011000000",
		"0011001111000000",
		"1111111111000000",
	])
	p16lu2.setValue([
		"0000000000110000",
		"1100110000110000",
		"0011001100110000",
		"1111111100110000",
		"0000000011110000",
		"1100110011110000",
		"0011001111110000",
		"1111111111110000",
	])
	p16lu3.setValue([
		"0000000000001111",
		"1100110000001111",
		"0011001100001111",
		"1111111100001111",
		"0000000011001111",
		"1100110011001111",
		"0011001111001111",
		"1111111111001111",
	])
	p16lu4.setValue([
		"0000000000111111",
		"1100110000111111",
		"0011001100111111",
		"1111111100111111",
		"0000000011111111",
		"1100110011111111",
		"0011001111111111",
		"1111111111111111",
	])
</script>


## Ending notes

### Segment display

I made use of [this JS](http://www.3quarks.com/en/SegmentDisplay/) for displaying segmented displays. The edited JS script can be found [here.]({{site.url}}/assets/js/bss.js)

### rexgen
I used [rexgen](https://github.com/teeshop/rexgen) to generate the bits. I could have written a pythonic-or-C function to generate combinations but I was just lazy.

A sample code to generate full symmetry bits for $$7$$-segment is:
```bash
rexgen '([01])([01])\2\1\2\2[01]'
```
### Insufficient
Even in the case of $$16$$ segments, the full symmetry charset cardinality is  only $$32$$. So, you can cover the alphabet set or the digit set but not both simultaneously. 

If you cover all the alphabets, you would only have $$6$$ remaining in the set so you can have like base6 digits.

### Mapping
Let's say we only want to map alphabets in $$16$$-segment full symmetry case.

How would we do a one-to-one mapping? This is more of a design question than a scientific question now. I am not going to do this now. 

Maybe when I am in the mood, I'd. Or, maybe, anyone can define their own mapping which can be their own encryption.
