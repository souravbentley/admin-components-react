/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Text, Tile } from "@itwin/itwinui-react";
import classNames from "classnames";
import React from "react";
import { useInView } from "react-intersection-observer";

import { ApiOverrides } from "../../types";
import { useIModelThumbnail } from "./useIModelThumbnail";

export interface IModelThumbnailProps {
  className?: string;
  /** Id of the iModel to fetch thumbnail for */
  iModelId: string;
  /** Triggered on the image click, controls pointer */
  onClick?(iModelId: string): void;
  /* Access token that requires the `imodels:read` scope. */
  accessToken?: string | (() => Promise<string>) | undefined;
  /** Object that configures different overrides for the API
   * @property data thumbnail URL
   * @property serverEnvironmentPrefix Either qa or dev
   */
  apiOverrides?: ApiOverrides<string>;
}

/** Clickable iModel thumbnail, fetched from the servers */
export const IModelThumbnail = ({
  iModelId,
  accessToken,
  apiOverrides,
  className,
}: IModelThumbnailProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    skip: !!apiOverrides?.data,
  });
  const thumbnail = useIModelThumbnail(
    iModelId,
    inView ? accessToken : undefined,
    apiOverrides
  );
  return thumbnail ? (
    <Tile.ThumbnailPicture
      url={thumbnail}
      ref={ref}
      className={classNames("iac-thumbnail", className)}
    />
  ) : (
    <Text
      as="p"
      variant="body"
      ref={ref}
      isSkeleton
      style={{ height: "100%", width: "100%", margin: 0 }}
    />
  );
};
