
SPA was made according to the task sheet except a few things I have explained below.

	1.There no "calculator" button on the layout, but it was required in the technical task, so I added it in the bottom of "main" block.
	2.According to the technical task, header and footer should be 100px height. Id did it, but I had to reduce the height of header and footer,
		for mobile devices in media queries, because in such way too less free space for main content were on the page.
	3.I didn't catch wrong input values such as max and min values or type (as I should've done in this task), because it can be limited by native html
		properties of input. So I catch errors during transformation json data from PB API, because it was a real error. (PB can change exchange currency during
		a day a few times, but they never change BTC cost in the same time. That why I can fetch data and "response.ok will be true" but I will not get all 
		data I need). So I wrapped "try-catch block" this part of the code.
	4. I could've control the state of the APP by Classes state, Hooks and Redux. I chose 1st one because I have a small state in just a one component.
	5. Media queries were tested for the most popular devices as Iphone 5S - iphoneX, Ipad, Ipad Pro and higher resolution for portrait and landscape orientation. 

	Used technologies(HTML,CSS(Flex),JavaScript(ES6),React)
 

