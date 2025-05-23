import React from 'react';
import { Card, CardContent, Grid2, IconButton } from '@mui/material';
import Tile, { CatalogItemWithName } from '../tile/Tile';
import AddIcon from '@mui/icons-material/Add';
import { Ref } from '../../Refs';
import { v1 } from "@docker/extension-api-client-types";
import Secrets from '../../Secrets';
import TileActions from '../tile/TileActions';
import { useCatalogContext } from '../../context/CatalogContext';

interface ToolCatalogProps {
    search: string;
    catalogItems: CatalogItemWithName[];
    client: v1.DockerDesktopClient;
    ddVersion: { version: string, build: number };
    canRegister: boolean;
    register: (item: CatalogItemWithName) => Promise<void>;
    unregister: (item: CatalogItemWithName) => Promise<void>;
    onSecretChange: (secret: { name: string, value: string }) => Promise<void>;
    secrets: Secrets.Secret[];
    registryItems: { [key: string]: { ref: string, config: any } };
    setConfiguringItem: (item: CatalogItemWithName) => void;
    config: { [key: string]: { [key: string]: any } };
}

const ToolCatalog: React.FC<ToolCatalogProps> = ({ config, setConfiguringItem, search, catalogItems, client, ddVersion, canRegister, register, unregister, onSecretChange, secrets, registryItems }) => {
    const filteredCatalogItems = catalogItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Grid2 container spacing={1} width='90vw' maxWidth={1000}>
            {filteredCatalogItems.map((catalogItem) => {
                const expectedKeys = catalogItem.config?.map((c: any) => c.name) || [];
                const hasAllConfig = !catalogItem.config || expectedKeys?.every((c: any) => config[catalogItem.name]?.[c] !== undefined);
                const unAssignedConfig = expectedKeys?.filter((c: any) => config[catalogItem.name]?.[c] === undefined);
                return (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={catalogItem.name}>
                        <Tile
                            item={catalogItem}
                            registered={registryItems[catalogItem.name]?.ref !== undefined}
                            onSecretChange={onSecretChange}
                            secrets={secrets}
                            ActionsSlot={<TileActions
                                canRegister={canRegister}
                                unAssignedConfig={unAssignedConfig}
                                setConfiguringItem={setConfiguringItem}
                                item={catalogItem}
                                ddVersion={ddVersion}
                                registered={registryItems[catalogItem.name]?.ref !== undefined}
                                register={register}
                                unregister={unregister}
                                onSecretChange={onSecretChange}
                                secrets={secrets}
                            />}
                        />
                    </Grid2>
                )
            })}
            <Grid2 size={12}>
                <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CardContent>
                        <IconButton sx={{ height: '100%' }} onClick={() => {
                            client.host.openExternal('https://vonwig.github.io/prompts.docs/tools/docs/');
                        }}>
                            <AddIcon sx={{ width: '100%', height: 100 }} />
                        </IconButton>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
};

export default ToolCatalog; 