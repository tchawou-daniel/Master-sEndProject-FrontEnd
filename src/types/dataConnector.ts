export declare type DataConnectorFieldType =
'string' | 'boolean' | 'number' | 'currency' | 'date' | 'datetime' | 'time' | 'enum' | 'address' | 'percent';
export interface DataConnectorObjectField {
  enabled?: boolean;
  label: string;
  name: string;
  relationshipName?: string;
  type: DataConnectorFieldType;
  allowedTypes?: DataConnectorFieldType[];
  format?: string;
  isId?: boolean;
  isName?: boolean;
  unique?: boolean;
  referenceTo?: string[];
  isMandatory?: boolean;
}
