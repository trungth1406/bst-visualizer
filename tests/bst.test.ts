import { expect } from "chai";
import { Tree } from "../src/bst";

describe('create new bst tree', () => {
    it('insert root node', () => {
        let tree = Tree<Number, String>();
        tree.insert(12, "First");
        console.log(tree);

        expect(tree.root).not.null;
    });
});