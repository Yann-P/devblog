# Install haxe-4.0.0-preview on Ubuntu 18.04

The official documentation provides a PPA but it does not seem to include the latest version for 18.04 at this time.

Here is a simple way to install it, inspired by `install` section of the [main haxe Makefile](https://github.com/HaxeFoundation/haxe/blob/development/Makefile), for people like me who don't want to build everything.


## Uninstall old verisons

This is recommended in the Haxe documentation

```bash
sudo apt purge haxe neko
```

If you're paranoid, remove all packages from your `haxelib` directory.


## Download the binaries

I downloaded 4.0.0-preview.5 (under "Linux 64-bit Binaries"): https://haxe.org/download/version/4.0.0-preview.5/

Unpack it and `cd` into it

## Copy the binaries and the std


```bash
cp haxe haxelib /usr/local/bin/
```

Now the important part: `haxe` and `haxelib` need to find the standard library, otherwise cryptic errors will ensue. 

I found sparse references to environment variables like `HAXE_STD_PATH` to put in `~/profile` but had no luck whth that.

What worked is to use the default path documented in the main repo's Makefile, where freshly built files would have be copied if we had built from source.

```bash
mkdir -p /usr/local/share/haxe/
cp -r std/ /usr/local/share/haxe/
```

## Setup haxelib

```bash
mkdir ~/haxelib # where libs will be stored
haxelib setup ~/haxelib
```

That's it! 