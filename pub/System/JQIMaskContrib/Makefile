FOSWIKI_ROOT?=~/foswiki/core
PKG_SOURCE=imask.js init.js
TARGET=pkg.js

-include $(FOSWIKI_ROOT)/pub/System/JQueryPlugin/Makefile.include

pkg.uncompressed.js: $(PKG_SOURCE)
	cat $(PKG_SOURCE) > $@

clean:
	rm -f pkg.* imask.js package-lock.json
	rm -rf node_modules

imask.js: node_modules/imask/dist/imask.js
	cat $^ |grep -v sourceMappingURL=imask.js.map > $@

node_modules/imask/dist/imask.js:
	npm install
