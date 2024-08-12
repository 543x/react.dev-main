import {Children, useMemo} from 'react';
import CodeBlock from './CodeBlock';

interface CodeDiagramProps {
  children: React.ReactNode;
  flip?: boolean;
}

export function CodeDiagram({children, flip = false}: CodeDiagramProps) {
  // 使用 useMemo 来避免在每次渲染时都重新计算这些值
  const illustration = useMemo(() => {
    return Children.toArray(children).filter(child => child.type === 'img');
  }, [children]);

  const content = useMemo(() => {
    return Children.toArray(children).map((child, index) => {
      if (child.type?.mdxName === 'pre') {
        // 为 CodeBlock 组件提供一个唯一的 key
        return <CodeBlock key={`codeblock-${index}`} {...child.props} noMargin={true} noMarkers={true} />;
      } else if (child.type === 'img') {
        return null;
      } else {
        // 为其他类型的子元素提供一个唯一的 key
        return <div key={`other-${index}`}>{child}</div>;
      }
    });
  }, [children]);

  if (flip) {
    return (
      <section className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        {illustration}
        <div className="flex flex-col justify-center">{content}</div>
      </section>
    );
  }
  return (
    <section className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
      <div className="flex flex-col justify-center">{content}</div>
      <div className="py-4">{illustration}</div>
    </section>
  );
}
