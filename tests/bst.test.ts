import { expect } from "chai";
import { Tree } from "../src/bst";


describe('create new bst tree', () => {
    let tree = new Tree<Number, String>();
    it('insert root node', () => {
        tree.insert(12, "First");
        expect(tree.root).not.null;
        expect(tree.root.key).equal(12);
    });

    it('insert child node for root', () => {
        tree.insert(10, "Second");
        tree.insert(13, "Third");
        expect(tree.root.left).not.null;
        expect(tree.root.right).not.null;
        expect(tree.root.left.key).equal(10);
        expect(tree.root.right.key).equal(13);
    });
    it('update root node value', () => {
        tree.insert(12, "Changed");
        expect(tree.root.left).not.null;
        expect(tree.root.right).not.null;
        expect(tree.root.value).equal("Changed");
    });
});