import AdminPage from './AdminPage';
import type { IPageAttrs } from '../../common/components/Page';
import type { AlertIdentifier } from '../../common/states/AlertManagerState';
import type Mithril from 'mithril';
import type { SaveSubmitEvent } from './AdminPage';
import ItemList from '../../common/utils/ItemList';
export interface MailSettings {
    data: {
        attributes: {
            fields: Record<string, any>;
            sending: boolean;
            errors: any[];
        };
    };
}
export default class MailPage<CustomAttrs extends IPageAttrs = IPageAttrs> extends AdminPage<CustomAttrs> {
    sendingTest: boolean;
    status?: {
        sending: boolean;
        errors: any;
    };
    driverFields?: Record<string, any>;
    testEmailSuccessAlert?: AlertIdentifier;
    oninit(vnode: Mithril.Vnode<CustomAttrs, this>): void;
    headerInfo(): {
        className: string;
        icon: string;
        title: string | any[];
        description: string | any[];
    };
    refresh(): void;
    content(): JSX.Element;
    mailSettingItems(): ItemList<Mithril.Children>;
    sendTestEmail(): void;
    saveSettings(e: SaveSubmitEvent): Promise<void>;
    static register(): void;
}
