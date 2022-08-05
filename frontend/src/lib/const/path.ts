const PATH = {
  CHANNEL: "/channel/[channelId]",
} as const;

/** @package */
export const getPath = (pathKey: keyof typeof PATH, ...args: string[]) => {
  const val = PATH[pathKey];

  if (!args) {
    return val;
  }

  const dirs = val.slice(1).split("/");

  const newPath = dirs.map((dir) => {
    if (dir.match(/\[.*?\]/)) {
      const replaceDir = args[0];
      args.shift();
      return replaceDir;
    }
    return dir;
  });

  return "/" + newPath.join("/");
};

// TODO: Cloud Run上で環境変数が読み込めないので、ここで定義している
export const BACKEND_PATH = "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app";
