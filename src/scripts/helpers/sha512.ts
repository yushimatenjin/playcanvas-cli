/* tslint:disable */
import crypto from "isomorphic-crypto";
export default (string: string) => {
  const hash = crypto.createHash("sha512");
  hash.write(string);
  return hash.digest("hex");
};
