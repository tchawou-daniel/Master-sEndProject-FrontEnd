- Ensure the SVG is square. It must have a viewBox like `2 3 56 56`, with the exact two same last digits. If it's not the case, it will break the layout
- Put the SVG with only the `<svg>` tag and its content. Don't put `<!XML` or anything like this
- Avoid AT ALL COSTS to put metadata, filter, and embedded CSS in your SVGs. It makes them buggy and not reusable.
- Remove groups that have no transform, AND modify the SVG to not have a group if the group is global
- `<svg>` tag MUST only have the basic xmlns (`xmlns="http://www.w3.org/2000/svg"`), the viewBox, and the `fill="currentColor"` to have the possibility to overwrite the color
- remove any other `fill` attributes inside the file. If there's some `fill="white"` or `fill="transparent" or `fill="#FFF"` or `fill="#FFFFFF"`, you must open an SVG editor, convert everything to pass and do a substract to delete the shapes that have this attribute.

Main sources:
- <https://materialdesignicons.com/>
