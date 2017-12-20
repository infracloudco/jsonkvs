# jsonkvs

Use physical JSON files as a key value store

## Demo

```
const jsonkvs = require('jsonkvs')
const packageJson = jsonkvs('./myFile.json')

packageJson.set('one', 'some value')
packageJson.del('someKey')
packageJson.save() // write changes
```

## Config

| Key      | Default | Detail                                                             |
| -------- | ------- | ------------------------------------------------------------------ |
| tabSpace | '\t'    | What character to use to indent output JSON. Defaults to hard tab. |

## API

### jsonkvs(path, config)

Load a JSON file at a given `path`.

#### .get(key)

Get the value of a given `key`. If no `key` is passed will return the whole object.

#### .set(key, value | patch, replace=false)

Set the `value` of a given `key`. Can be called two ways:

* By passing the `key` as first argument and `value` as second.
* By passing an `patch` object. In this case the patch will be merged. If `replace` is set then the original file will be overridden by the patch

#### .del(key)

Unset a given keys

#### .save()

Commit changes to disk

## ToDo

* [ ] When a file is open it's contents is loaded into memory and it's not locked.
* [ ] If the file changes on the FS it's contents should be reread and memory copy updated.
* [ ] Any pending changes in memory will superseed new changes from disk.
* [ ] The above bollocks should all be configurable (you can lock a file, get/set directly from the file (via inmemory cache), conflict resolution)
* [ ] Can save to an alternative location

## Licence

(MIT 2-Clause)

Copyright (c) 2017, [Infracloud Ltd](http://infracloud.co) All rights reserved.
