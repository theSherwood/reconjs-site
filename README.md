# ReconJS Site

## What's ReconJS

[ReconJS](https://github.com/theSherwood/ReconJS) is a javascript library used for statically analyzing arbitrary Javascript code for security threats.

## What is the ReconJS Site?

The [ReconJS Site](https://reconjs-site.thesherwood.vercel.app/) gamifies improving ReconJS. The site is an adversarial demo of ReconJS. But it's more than that, too. Get past ReconJS' security checks, and your code will be used to improve the ReconJS library.

## What's the goal?

Submit code that gets past ReconJS and changes the value of window.target.

## How does the site work?

You type some code into the editor and hit submit it.

ReconJS checks the code for security threats.

If ReconJS finds no threats :

&nbsp;&nbsp; The `window` object gets a property `target` with a random and arbitrary value.

&nbsp;&nbsp; Your code is run.

&nbsp;&nbsp; The value of `window.target` is read.

&nbsp;&nbsp; If the value of `window.target` has changed :

&nbsp;&nbsp;&nbsp;&nbsp; You win! And your code will be saved to a database for improving ReconJS.

&nbsp;&nbsp; Else :

&nbsp;&nbsp;&nbsp;&nbsp; Nothing happens.

&nbsp;&nbsp; `window.target` is deleted.

Else :

&nbsp;&nbsp; The specific security threat(s) will be logged to the screen.

