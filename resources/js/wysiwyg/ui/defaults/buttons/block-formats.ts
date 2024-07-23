import {$createCalloutNode, $isCalloutNodeOfCategory, CalloutCategory} from "../../../nodes/callout";
import {EditorButtonDefinition} from "../../framework/buttons";
import {EditorUiContext} from "../../framework/core";
import {$selectionContainsNodeType, $toggleSelectionBlockNodeType} from "../../../helpers";
import {$createParagraphNode, $isParagraphNode, BaseSelection, LexicalNode} from "lexical";
import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode,
    $isQuoteNode,
    HeadingNode,
    HeadingTagType
} from "@lexical/rich-text";

function buildCalloutButton(category: CalloutCategory, name: string): EditorButtonDefinition {
    return {
        label: `${name} Callout`,
        action(context: EditorUiContext) {
            context.editor.update(() => {
                $toggleSelectionBlockNodeType(
                    (node) => $isCalloutNodeOfCategory(node, category),
                    () => $createCalloutNode(category),
                )
            });
        },
        isActive(selection: BaseSelection|null): boolean {
            return $selectionContainsNodeType(selection, (node) => $isCalloutNodeOfCategory(node, category));
        }
    };
}

export const infoCallout: EditorButtonDefinition = buildCalloutButton('info', 'Info');
export const dangerCallout: EditorButtonDefinition = buildCalloutButton('danger', 'Danger');
export const warningCallout: EditorButtonDefinition = buildCalloutButton('warning', 'Warning');
export const successCallout: EditorButtonDefinition = buildCalloutButton('success', 'Success');

const isHeaderNodeOfTag = (node: LexicalNode | null | undefined, tag: HeadingTagType) => {
    return $isHeadingNode(node) && (node as HeadingNode).getTag() === tag;
};

function buildHeaderButton(tag: HeadingTagType, name: string): EditorButtonDefinition {
    return {
        label: name,
        action(context: EditorUiContext) {
            context.editor.update(() => {
                $toggleSelectionBlockNodeType(
                    (node) => isHeaderNodeOfTag(node, tag),
                    () => $createHeadingNode(tag),
                )
            });
        },
        isActive(selection: BaseSelection|null): boolean {
            return $selectionContainsNodeType(selection, (node) => isHeaderNodeOfTag(node, tag));
        }
    };
}

export const h2: EditorButtonDefinition = buildHeaderButton('h2', 'Large Header');
export const h3: EditorButtonDefinition = buildHeaderButton('h3', 'Medium Header');
export const h4: EditorButtonDefinition = buildHeaderButton('h4', 'Small Header');
export const h5: EditorButtonDefinition = buildHeaderButton('h5', 'Tiny Header');

export const blockquote: EditorButtonDefinition = {
    label: 'Blockquote',
    action(context: EditorUiContext) {
        context.editor.update(() => {
            $toggleSelectionBlockNodeType($isQuoteNode, $createQuoteNode);
        });
    },
    isActive(selection: BaseSelection|null): boolean {
        return $selectionContainsNodeType(selection, $isQuoteNode);
    }
};

export const paragraph: EditorButtonDefinition = {
    label: 'Paragraph',
    action(context: EditorUiContext) {
        context.editor.update(() => {
            $toggleSelectionBlockNodeType($isParagraphNode, $createParagraphNode);
        });
    },
    isActive(selection: BaseSelection|null): boolean {
        return $selectionContainsNodeType(selection, $isParagraphNode);
    }
}