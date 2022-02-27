# SlavaUkraini

DISCLAIMER: (D)DOS'ing is illegal! Usage of this tool is intended for educational purposes only.

Anyways, this tool is a DDoS tool that comes with a list of Russian propaganda/government websites. I recommend running this through a proxy/VPN or on a VPS. 

List taken from other sources. 

### Prerequisites

You will need: 
- [Node.js](https://nodejs.org/en/)

### How to Use

Download/clone this repository, once inside your directory using a command line, run: 

```
node .
```

Optional arguments: 
- `workers`: Number of workers to spawn. Default: 10
- `silent`: This removes the constant updating hit result logs. It will not stop the report or other output from being printed. This may result in increased performance.

Example: 
```
node . --workers=20 --silent
```

To exit, simply use `Ctrl+C`