# Website/Resume, September 2023

A simple, aesthetically pleasing, and accessible website that also serves as a printable resume.

- No CMS. No Framework. Static Output.
- Content is maintained in a [flat file](src/md/resume.md) for the benefit of version control and ease of editing
- [Marked](https://markedjs.org) is used to inject content at compile-time.
- A modified Marked header parser is used to add ID attributes to headings for linking and styling purposes
- Default [Prettier](https://prettier.io/) and [StandardJS](https://standardjs.com/) configurations with minor 
  preferential tweaks

Please note, this is a work in progress as well as a personal test-bed for various technologies and techniques. Constructive feedback is welcomed via PR.


## TO DO
- [ ] Improve everything
- [ ] Move static assets to a separate directory
- [ ] Add description and keywords metadata to a flat file
- [ ] Move to GCP bucket
- [ ] Add Projects section
- [ ] Configure lint-staged
- [ ] Eliminate Webpack(?)
