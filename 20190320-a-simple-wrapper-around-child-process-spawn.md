# Child processes without dealing with events in Node

Subprocesses can be tedious to deal with in node. You have to deal with a lot of events and think about several exit and error cases.

Here is a simple wrapper that abstracts a subprocess as a promise, that I use regularily in my code.

## Example usage:

```typescript

const { code, signal, stderr, stdout } = await spawnWrapper();
if(code !== 0 || signal) {
    throw new Error(`Command failed with code ${code}, signal ${signal}`);
}

```

```typescript
import { spawn } from 'child_process';

async function spawnWrapper(command: string, args: ReadonlyArray<string>): Promise<{
    code: number;
    signal: string;
    stderr: string;
    stdout: string;
}> {
    return new Promise<any>((res, rej) => {
        const child = spawn(command, args);
        let stderr = '',
            stdout = '';

        child.stdout.on('data', data => (stdout += data.toString());
        child.stderr.on('data', data => (stderr += data.toString());

        child.on('error', e => rej(new Error(`Can't spawn: ${e}`)));
        child.on('exit', (code: number, signal: string) => {
            res({ code, signal, stderr, stdout });
        });
    });
}
```

## Limitations

- If the process hangs, not only will it not resolve but you won't see stdout/stderr. An solution is to use Promise.race() to implement a timeout.