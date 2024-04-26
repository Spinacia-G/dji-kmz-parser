import { TemplateFile } from './template'
import { WaylineFile } from './wayline'

export interface KmzFile {
  /**
   * 航线模板文件
   */
  template: TemplateFile
  /**
   * 航线执行文件
   */
  waylines: WaylineFile
}
