/*!
 * bss.js
 *
 * Edited to make it basic
 *
 * Inspired by 
 * Copyright 2012, Rüdiger Appel
 * http://www.3quarks.com
 * Published under Creative Commons 3.0 License.
 *
 * Date: 2012-02-14
 * Version: 1.0.0
 * 
 * Dokumentation: http://www.3quarks.com/de/Segmentanzeige
 * Documentation: http://www.3quarks.com/en/SegmentDisplay
 */


// Segment display types
BitSegment.SevenSegment        = 7;
BitSegment.HexSegment          = 16;

// Segment corner types
BitSegment.SymmetricCorner = 0;
BitSegment.SquaredCorner   = 1;
BitSegment.RoundedCorner   = 2;


function BitSegment(displayId) {
  this.displayId       = displayId;
  this.ndigits         = 1;
  this.digitHeight     = 30;
  this.digitWidth      = 14;
  this.digitDistance   = 2.5;
  this.displayAngle    = 0;
  this.segmentWidth    = 2.0;
  this.segmentDistance = 0.3;
  this.segmentCount    = BitSegment.SevenSegment;
  this.cornerType      = BitSegment.RoundedCorner;
  this.colorOn         = '#e95d0f';
  this.colorOff        = '#4b1e05';
};

BitSegment.prototype.setValue = function(value) {
  this.value = value;
  this.draw();
};

BitSegment.prototype.draw = function() {
  var display = document.getElementById(this.displayId);
  if (display) {
    var context = display.getContext('2d');
    if (context) {
      // clear canvas
      context.clearRect(0, 0, display.width, display.height);
      
      // compute and check display width
      var width =  this.ndigits*( this.segmentWidth + this.digitWidth ) + 3*this.segmentWidth;
      if (width <= 0) {
        return;
      }
      
      // compute skew factor
      var angle = -1.0 * Math.max(-45.0, Math.min(45.0, this.displayAngle));
      var skew  = Math.tan((angle * Math.PI) / 180.0);
      
      // compute scale factor
      var scale = Math.min(display.width / (width + Math.abs(skew * this.digitHeight)), display.height / this.digitHeight);
      
      // compute display offset
      var offsetX = (display.width - (width + skew * this.digitHeight) * scale) / 2.0;
      var offsetY = (display.height - this.digitHeight * scale) / 2.0;
      
      // context transformation
      context.save();
      context.translate(offsetX, offsetY);
      context.scale(scale, scale);
      context.transform(1, 0, skew, 1, 0, 0);

      // draw segments
      var xPos = 0;
      for (var i = 0; i < this.ndigits; i++) {
      	var bits = this.value[i];
				if (bits.length == this.segmentCount) {
					xPos += this.drawSegments(context, xPos, bits);
				}
      }
      // finish drawing
      context.restore();
    }
  }
};

BitSegment.prototype.drawSegments = function(context, xPos, bits) {
	var r = Math.sqrt(this.segmentWidth * this.segmentWidth / 2.0);
	var d = Math.sqrt(this.segmentDistance * this.segmentDistance / 2.0);
	var e = d / 2.0; 
	var f = (this.segmentWidth - d) * Math.sin((45.0 * Math.PI) / 180.0);
	var g = f / 2.0;
	var h = (this.digitHeight - 3.0 * this.segmentWidth) / 2.0;
	var w = (this.digitWidth - 3.0 * this.segmentWidth) / 2.0;
	var s = this.segmentWidth / 2.0;
	var t = this.digitWidth / 2.0;

	// index variable
	var idx = 0;

	// draw segment a (a1 and a2 for 16 segments)
	if (this.segmentCount == 16) {
		var x = xPos;
		var y = 0;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		switch (this.cornerType) {
			case SegmentDisplay.SymmetricCorner:
				context.moveTo(x + s + d, y + s);
				context.lineTo(x + this.segmentWidth + d, y);
				break;
			case SegmentDisplay.SquaredCorner:
				context.moveTo(x + s + e, y + s - e);
				context.lineTo(x + this.segmentWidth, y);
				break;
			default:
				context.moveTo(x + this.segmentWidth - f, y + this.segmentWidth - f - d);
				context.quadraticCurveTo(x + this.segmentWidth - g, y, x + this.segmentWidth, y);
		}
		context.lineTo(x + t - d - s, y);
		context.lineTo(x + t - d, y + s);
		context.lineTo(x + t - d - s, y + this.segmentWidth);
		context.lineTo(x + this.segmentWidth + d, y + this.segmentWidth);
		context.fill();

		var x = xPos;
		var y = 0;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + this.digitWidth - this.segmentWidth - d, y + this.segmentWidth);
		context.lineTo(x + t + d + s, y + this.segmentWidth);
		context.lineTo(x + t + d, y + s);
		context.lineTo(x + t + d + s, y);
		switch (this.cornerType) {
			case SegmentDisplay.SymmetricCorner:
				context.lineTo(x + this.digitWidth - this.segmentWidth - d, y);
				context.lineTo(x + this.digitWidth - s - d, y + s);
				break;
			case SegmentDisplay.SquaredCorner:
				context.lineTo(x + this.digitWidth - this.segmentWidth, y);
				context.lineTo(x + this.digitWidth - s - e, y + s - e);
				break;
			default:
				context.lineTo(x + this.digitWidth - this.segmentWidth, y);
				context.quadraticCurveTo(x + this.digitWidth - this.segmentWidth + g, y, x + this.digitWidth - this.segmentWidth + f, y + this.segmentWidth - f - d);
		}
		context.fill();

	} else {
		var x = xPos;
		var y = 0;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		switch (this.cornerType) {
			case SegmentDisplay.SymmetricCorner:
				context.moveTo(x + s + d, y + s);
				context.lineTo(x + this.segmentWidth + d, y);
				context.lineTo(x + this.digitWidth - this.segmentWidth - d, y);
				context.lineTo(x + this.digitWidth - s - d, y + s);
				break;
			case SegmentDisplay.SquaredCorner:
				context.moveTo(x + s + e, y + s - e);
				context.lineTo(x + this.segmentWidth, y);
				context.lineTo(x + this.digitWidth - this.segmentWidth, y);
				context.lineTo(x + this.digitWidth - s - e, y + s - e);
				break;
			default:
				context.moveTo(x + this.segmentWidth - f, y + this.segmentWidth - f - d);
				context.quadraticCurveTo(x + this.segmentWidth - g, y, x + this.segmentWidth, y);
				context.lineTo(x + this.digitWidth - this.segmentWidth, y);
				context.quadraticCurveTo(x + this.digitWidth - this.segmentWidth + g, y, x + this.digitWidth - this.segmentWidth + f, y + this.segmentWidth - f - d);
		}
		context.lineTo(x + this.digitWidth - this.segmentWidth - d, y + this.segmentWidth);
		context.lineTo(x + this.segmentWidth + d, y + this.segmentWidth);
		context.fill();
	}

	// draw segment b
	x = xPos + this.digitWidth - this.segmentWidth;
	y = 0;
	context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
	context.beginPath();
	switch (this.cornerType) {
		case SegmentDisplay.SymmetricCorner:
			context.moveTo(x + s, y + s + d);
			context.lineTo(x + this.segmentWidth, y + this.segmentWidth + d);
			break;
		case SegmentDisplay.SquaredCorner:
			context.moveTo(x + s + e, y + s + e);
			context.lineTo(x + this.segmentWidth, y + this.segmentWidth);
			break;
		default:
			context.moveTo(x + f + d, y + this.segmentWidth - f);
			context.quadraticCurveTo(x + this.segmentWidth, y + this.segmentWidth - g, x + this.segmentWidth, y + this.segmentWidth);
	}
	context.lineTo(x + this.segmentWidth, y + h + this.segmentWidth - d);
	context.lineTo(x + s, y + h + this.segmentWidth + s - d);
	context.lineTo(x, y + h + this.segmentWidth - d);
	context.lineTo(x, y + this.segmentWidth + d);
	context.fill();

	// draw segment c
	x = xPos + this.digitWidth - this.segmentWidth;
	y = h + this.segmentWidth;
	context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
	context.beginPath();
	context.moveTo(x, y + this.segmentWidth + d);
	context.lineTo(x + s, y + s + d);
	context.lineTo(x + this.segmentWidth, y + this.segmentWidth + d);
	context.lineTo(x + this.segmentWidth, y + h + this.segmentWidth - d);
	switch (this.cornerType) {
		case SegmentDisplay.SymmetricCorner:
			context.lineTo(x + s, y + h + this.segmentWidth + s - d);
			context.lineTo(x, y + h + this.segmentWidth - d);
			break;
		case SegmentDisplay.SquaredCorner:
			context.lineTo(x + s + e, y + h + this.segmentWidth + s - e);
			context.lineTo(x, y + h + this.segmentWidth - d);
			break;
		default:
			context.quadraticCurveTo(x + this.segmentWidth, y + h + this.segmentWidth + g, x + f + d, y + h + this.segmentWidth + f); //
			context.lineTo(x, y + h + this.segmentWidth - d);
	}
	context.fill();

	// draw segment d (d1 and d2 for 16 segments)
	if (this.segmentCount == 16) {
		x = xPos;
		y = this.digitHeight - this.segmentWidth;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + this.segmentWidth + d, y);
		context.lineTo(x + t - d - s, y);
		context.lineTo(x + t - d, y + s);
		context.lineTo(x + t - d - s, y + this.segmentWidth);
		switch (this.cornerType) {
			case SegmentDisplay.SymmetricCorner:
				context.lineTo(x + this.segmentWidth + d, y + this.segmentWidth);
				context.lineTo(x + s + d, y + s);
				break;
			case SegmentDisplay.SquaredCorner:
				context.lineTo(x + this.segmentWidth, y + this.segmentWidth);
				context.lineTo(x + s + e, y + s + e);
				break;
			default:
				context.lineTo(x + this.segmentWidth, y + this.segmentWidth);
				context.quadraticCurveTo(x + this.segmentWidth - g, y + this.segmentWidth, x + this.segmentWidth - f, y + f + d);
				context.lineTo(x + this.segmentWidth - f, y + f + d);
		}
		context.fill();

		x = xPos;
		y = this.digitHeight - this.segmentWidth;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + t + d + s, y + this.segmentWidth);
		context.lineTo(x + t + d, y + s);
		context.lineTo(x + t + d + s, y);
		context.lineTo(x + this.digitWidth - this.segmentWidth - d, y);
		switch (this.cornerType) {
			case SegmentDisplay.SymmetricCorner:
				context.lineTo(x + this.digitWidth - s - d, y + s);
				context.lineTo(x + this.digitWidth - this.segmentWidth - d, y + this.segmentWidth);
				break;
			case SegmentDisplay.SquaredCorner:
				context.lineTo(x + this.digitWidth - s - e, y + s + e);
				context.lineTo(x + this.digitWidth - this.segmentWidth, y + this.segmentWidth);
				break;
			default:
				context.lineTo(x + this.digitWidth - this.segmentWidth + f, y + f + d);
				context.quadraticCurveTo(x + this.digitWidth - this.segmentWidth + g, y + this.segmentWidth, x + this.digitWidth - this.segmentWidth, y + this.segmentWidth);
		}
		context.fill();
	}
	else {
		x = xPos;
		y = this.digitHeight - this.segmentWidth;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + this.segmentWidth + d, y);
		context.lineTo(x + this.digitWidth - this.segmentWidth - d, y);
		switch (this.cornerType) {
			case SegmentDisplay.SymmetricCorner:
				context.lineTo(x + this.digitWidth - s - d, y + s);
				context.lineTo(x + this.digitWidth - this.segmentWidth - d, y + this.segmentWidth);
				context.lineTo(x + this.segmentWidth + d, y + this.segmentWidth);
				context.lineTo(x + s + d, y + s);
				break;
			case SegmentDisplay.SquaredCorner:
				context.lineTo(x + this.digitWidth - s - e, y + s + e);
				context.lineTo(x + this.digitWidth - this.segmentWidth, y + this.segmentWidth);
				context.lineTo(x + this.segmentWidth, y + this.segmentWidth);
				context.lineTo(x + s + e, y + s + e);
				break;
			default:
				context.lineTo(x + this.digitWidth - this.segmentWidth + f, y + f + d);
				context.quadraticCurveTo(x + this.digitWidth - this.segmentWidth + g, y + this.segmentWidth, x + this.digitWidth - this.segmentWidth, y + this.segmentWidth);
				context.lineTo(x + this.segmentWidth, y + this.segmentWidth);
				context.quadraticCurveTo(x + this.segmentWidth - g, y + this.segmentWidth, x + this.segmentWidth - f, y + f + d);
				context.lineTo(x + this.segmentWidth - f, y + f + d);
		}
		context.fill();
	}

	// draw segment e
	x = xPos;
	y = h + this.segmentWidth;
	context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
	context.beginPath();
	context.moveTo(x, y + this.segmentWidth + d);
	context.lineTo(x + s, y + s + d);
	context.lineTo(x + this.segmentWidth, y + this.segmentWidth + d);
	context.lineTo(x + this.segmentWidth, y + h + this.segmentWidth - d);
	switch (this.cornerType) {
		case SegmentDisplay.SymmetricCorner:
			context.lineTo(x + s, y + h + this.segmentWidth + s - d);
			context.lineTo(x, y + h + this.segmentWidth - d);
			break;
		case SegmentDisplay.SquaredCorner:
			context.lineTo(x + s - e, y + h + this.segmentWidth + s - d + e);
			context.lineTo(x, y + h + this.segmentWidth);
			break;
		default:
			context.lineTo(x + this.segmentWidth - f - d, y + h + this.segmentWidth + f); 
			context.quadraticCurveTo(x, y + h + this.segmentWidth + g, x, y + h + this.segmentWidth);
	}
	context.fill();

	// draw segment f
	x = xPos;
	y = 0;
	context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
	context.beginPath();
	context.moveTo(x + this.segmentWidth, y + this.segmentWidth + d);
	context.lineTo(x + this.segmentWidth, y + h + this.segmentWidth - d);
	context.lineTo(x + s, y + h + this.segmentWidth + s - d);
	context.lineTo(x, y + h + this.segmentWidth - d);
	switch (this.cornerType) {
		case SegmentDisplay.SymmetricCorner:
			context.lineTo(x, y + this.segmentWidth + d);
			context.lineTo(x + s, y + s + d);
			break;
		case SegmentDisplay.SquaredCorner:
			context.lineTo(x, y + this.segmentWidth);
			context.lineTo(x + s - e, y + s + e);
			break;
		default:
			context.lineTo(x, y + this.segmentWidth);
			context.quadraticCurveTo(x, y + this.segmentWidth - g, x + this.segmentWidth - f - d, y + this.segmentWidth - f); 
			context.lineTo(x + this.segmentWidth - f - d, y + this.segmentWidth - f); 
	}
	context.fill();

	// draw segment g for 7 segments
	if (this.segmentCount == 7) {
		x = xPos;
		y = (this.digitHeight - this.segmentWidth) / 2.0;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + s + d, y + s);
		context.lineTo(x + this.segmentWidth + d, y);
		context.lineTo(x + this.digitWidth - this.segmentWidth - d, y);
		context.lineTo(x + this.digitWidth - s - d, y + s);
		context.lineTo(x + this.digitWidth - this.segmentWidth - d, y + this.segmentWidth);
		context.lineTo(x + this.segmentWidth + d, y + this.segmentWidth);
		context.fill();
	}

	// draw inner segments for the sixteen-segment-display
	if (this.segmentCount == 16) {
		// draw segment g1
		x = xPos;
		y = (this.digitHeight - this.segmentWidth) / 2.0;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + s + d, y + s);
		context.lineTo(x + this.segmentWidth + d, y);
		context.lineTo(x + t - d - s, y);
		context.lineTo(x + t - d, y + s);
		context.lineTo(x + t - d - s, y + this.segmentWidth);
		context.lineTo(x + this.segmentWidth + d, y + this.segmentWidth);
		context.fill();

		// draw segment g2
		x = xPos;
		y = (this.digitHeight - this.segmentWidth) / 2.0;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + t + d, y + s);
		context.lineTo(x + t + d + s, y);
		context.lineTo(x + this.digitWidth - this.segmentWidth - d, y);
		context.lineTo(x + this.digitWidth - s - d, y + s);
		context.lineTo(x + this.digitWidth - this.segmentWidth - d, y + this.segmentWidth);
		context.lineTo(x + t + d + s, y + this.segmentWidth);
		context.fill();

		// draw segment j 
		x = xPos + t - s;
		y = 0;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		if (this.segmentCount == 14) {
			context.moveTo(x, y + this.segmentWidth + this.segmentDistance);
			context.lineTo(x + this.segmentWidth, y + this.segmentWidth + this.segmentDistance);
		} else {
			context.moveTo(x, y + this.segmentWidth + d);
			context.lineTo(x + s, y + s + d);
			context.lineTo(x + this.segmentWidth, y + this.segmentWidth + d);
		}
		context.lineTo(x + this.segmentWidth, y + h + this.segmentWidth - d);
		context.lineTo(x + s, y + h + this.segmentWidth + s - d);
		context.lineTo(x, y + h + this.segmentWidth - d);
		context.fill();

		// draw segment m
		x = xPos + t - s;
		y = this.digitHeight;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		if (this.segmentCount == 14) {
			context.moveTo(x, y - this.segmentWidth - this.segmentDistance);
			context.lineTo(x + this.segmentWidth, y - this.segmentWidth - this.segmentDistance);
		} else {
			context.moveTo(x, y - this.segmentWidth - d);
			context.lineTo(x + s, y - s - d);
			context.lineTo(x + this.segmentWidth, y - this.segmentWidth - d);
		}
		context.lineTo(x + this.segmentWidth, y - h - this.segmentWidth + d);
		context.lineTo(x + s, y - h - this.segmentWidth - s + d);
		context.lineTo(x, y - h - this.segmentWidth + d);
		context.fill();

		// draw segment h
		x = xPos + this.segmentWidth;
		y = this.segmentWidth;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + this.segmentDistance, y + this.segmentDistance);
		context.lineTo(x + this.segmentDistance + r, y + this.segmentDistance);
		context.lineTo(x + w - this.segmentDistance , y + h - this.segmentDistance - r);
		context.lineTo(x + w - this.segmentDistance , y + h - this.segmentDistance);
		context.lineTo(x + w - this.segmentDistance - r , y + h - this.segmentDistance);
		context.lineTo(x + this.segmentDistance, y + this.segmentDistance + r);
		context.fill();

		// draw segment k
		x = xPos + w + 2.0 * this.segmentWidth;
		y = this.segmentWidth;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + w - this.segmentDistance, y + this.segmentDistance);
		context.lineTo(x + w - this.segmentDistance, y + this.segmentDistance + r);
		context.lineTo(x + this.segmentDistance + r, y + h - this.segmentDistance);
		context.lineTo(x + this.segmentDistance, y + h - this.segmentDistance);
		context.lineTo(x + this.segmentDistance, y + h - this.segmentDistance - r);
		context.lineTo(x + w - this.segmentDistance - r, y + this.segmentDistance);
		context.fill();

		// draw segment l
		x = xPos + w + 2.0 * this.segmentWidth;
		y = h + 2.0 * this.segmentWidth;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + this.segmentDistance, y + this.segmentDistance);
		context.lineTo(x + this.segmentDistance + r, y + this.segmentDistance);
		context.lineTo(x + w - this.segmentDistance , y + h - this.segmentDistance - r);
		context.lineTo(x + w - this.segmentDistance , y + h - this.segmentDistance);
		context.lineTo(x + w - this.segmentDistance - r , y + h - this.segmentDistance);
		context.lineTo(x + this.segmentDistance, y + this.segmentDistance + r);
		context.fill();

		// draw segment n
		x = xPos + this.segmentWidth;
		y = h + 2.0 * this.segmentWidth;
		context.fillStyle = bits.charAt(idx++) != "0" ? this.colorOn : this.colorOff;
		context.beginPath();
		context.moveTo(x + w - this.segmentDistance, y + this.segmentDistance);
		context.lineTo(x + w - this.segmentDistance, y + this.segmentDistance + r);
		context.lineTo(x + this.segmentDistance + r, y + h - this.segmentDistance);
		context.lineTo(x + this.segmentDistance, y + h - this.segmentDistance);
		context.lineTo(x + this.segmentDistance, y + h - this.segmentDistance - r);
		context.lineTo(x + w - this.segmentDistance - r, y + this.segmentDistance);
		context.fill();
	}

	return this.digitDistance + this.digitWidth;
};






