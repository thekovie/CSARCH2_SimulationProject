# Decimal-128 Floating-Point Converter
This web application will convert a decimal value to its IEE-754 Decimal-128 floating-point value.

_This project is for the CSARCH2 class at De La Salle University._

<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/01c166bd-8302-4092-9da1-f61a56dc972d">
<p align="center">Access our web application here:<br>🔗 https://ieee-754-dec128-converter.vercel.app/</p>

# Table of Contents
- [Introduction](#decimal-128-floating-point-converter)
- Project Showcase Video
- Test Cases
   - Positive Cases
   - Negative Cases
   - Rounding to 34 digits (Positive) with Different Rounding Methods
   - Rounding to 34 digits (Negative) with Different Rounding Methods

# Project Showcase Video
Here is the video showcase of our program. The video consists of the build and run of the web application, including the test cases we conducted.
<video src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/02fe063a-59b3-4cf3-b04f-6c93bf46502a"></video>
Alternatively, you can watch the video [here](https://youtu.be/lGAIaj_AYEA).

# Test Cases
Here are the test cases the team conducted. Kindly wait for the screenshots to load up.

## Positive Cases
### $12345000_{10} x 10^{125}$
Trailing Zeroes (Positive) - Truncation Rounding Method
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/6e0ce0c9-73da-45dd-bc3e-60ecba047c98">

### $0000012345_{10} x 10^{125}$
Leading Zeroes (Positive) - Truncation Rounding Method
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/bc3ccad2-90b2-47ae-af5d-d239db8de331">

### $12345_{10} x 10^{6111}$
Highest Possible Exponent - Truncation Rounding Method
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/fc4a8054-b429-4d6b-80f3-9ad26a0586b2">

### $12345_{10} x 10^{6112}$
Infinity Case - Truncation Rounding Method
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/8c4a3983-925e-49cd-ad2d-c62df4f97045">

## Negative Cases
### $-12345000_{10} x 10^{125}$
Trailing Zeroes (Negative Decimal) - Truncation Rounding Method
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/89add3a3-b4b4-444e-89a7-df6d53f36a5e">

### $-12345_{10} x 10^{6112}$
Infinity Case (Negative Decimal) - Truncation Rounding Method
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/95891c8c-e770-420a-b6e5-fef0ad938cb4">

## Rounding to 34 digits (Positive) with Different Rounding Methods
This will be the given for all rounding methods:
$1000000000000000000000000000000004.5_{10} x 10^{5}$

### Truncation Rounding Method
$1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/161e93ae-0a67-4018-b500-ad9d17a7f65f">

### Ceiling Rounding Method
$1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/b4380b29-632b-471b-bffb-6c4d8d42b462">

### Floor Rounding Method
$1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/43c30105-f353-431d-a4a1-dcc9d360c65d">

### Round to Nearest - Ties to Even (RTN-TTE)
$1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/ae25505a-9299-4dac-8b01-d21e70824f79">

$1000000000000000000000000000000006.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/26d91e08-798f-4257-b121-97939cf5c208">

## Rounding to 34 digits (Negative) with Different Rounding Methods
This will be the given for all rounding methods:
$-1000000000000000000000000000000004.5_{10} x 10^{5}$

### Truncation Rounding Method
$-1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/f7091245-7ca5-4ab9-8a19-6fa13c58dff2">

### Ceiling Rounding Method
$-1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/952f4722-4dbe-4429-a77e-878a03ea9d09">

### Floor Rounding Method
$-1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/ff49a23e-dc5d-4cef-8993-f95c567cf945">

### Round to Nearest - Ties to Even (RTN-TTE)

$-1000000000000000000000000000000004.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/6887e270-0632-4156-9044-289dc5c2e1da">

$-1000000000000000000000000000000006.5_{10} x 10^{5}$
<img width="1912" alt="image" src="https://github.com/thekovie/CSARCH2_SimulationProject/assets/40118781/0b1c6717-596e-4188-8b28-799ff204a603">







