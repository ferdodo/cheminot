SRC_VUE_TEMPLATES_1 = ./src/template.html
SRC_VUE_TEMPLATES_2 = $(wildcard ./src/components/*/template.html)

DIST_VUE_TEMPLATES = $(SRC_VUE_TEMPLATES_1:.html=.js) $(SRC_VUE_TEMPLATES_2:.html=.js)

all: VUE_TEMPLATES

VUE_TEMPLATES: $(DIST_VUE_TEMPLATES)

%.js: %.html
	npx --no-install vue-compiler-dom-cli --infile $^ --outfile $@ --mode module
