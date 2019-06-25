# ReconJS Site

## What's ReconJS

[ReconJS](https://github.com/theSherwood/ReconJS) is a javascript library used for statically analyzing arbitrary Javascript code for security threats.

## What is the ReconJS Site?

The [ReconJS Site](https://reconjs-site.thesherwood.now.sh/) gamifies improving ReconJS. The site is an adversarial demo of ReconJS. But it's more than that, too. Get past ReconJS' security checks, and your code will be used to improve the ReconJS library.

## What's the goal?

Submit code that gets past ReconJS and changes the value of window.target.

## How does the site work?

You type some code into the editor and hit submit it.

ReconJS checks the code for security threats.

If ReconJS finds no threats :

> The `window` object gets a property `target` with a random and arbitrary value.

> Your code is run.

> The value of `window.target` is read.

> If the value of `window.target` has changed :

>> You win! And your code will be saved to a database for improving ReconJS.

> Else :

>> Nothing happens.

> `window.target` is deleted.

Else :

> The specific security threat(s) will be logged to the screen.

